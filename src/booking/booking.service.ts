import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from 'src/dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(dto: CreateBookingDto) {
    return this.prisma.$transaction(async (tx) => {
      // Check session availability
      const sessions = await tx.session.findMany({
        where: { id: { in: dto.sessionIds } },
        select: { id: true, capacity: true },
      });

      // 2. Validate capacity
      const unavailable: { id: string }[] = sessions.filter(
        (s) => s.capacity <= 0,
      );
      if (unavailable.length > 0) {
        const ids = unavailable.map((s) => s.id).join(', ');
        throw new ConflictException(`Sessions ${ids} are full`);
      }

      // 3. Update session capacities
      await tx.session.updateMany({
        where: { id: { in: dto.sessionIds } },
        data: { capacity: { decrement: 1 } },
      });

      // Create booking
      return tx.booking.create({
        data: {
          userName: dto.userName,
          email: dto.email,
          phone: dto.phone,
          sessions: { connect: dto.sessionIds.map((id) => ({ id })) },
        },
        include: { sessions: true },
      });
    });
  }
}
