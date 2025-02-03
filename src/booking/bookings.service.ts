import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from 'src/dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(data: CreateBookingDto) {
    const sessions = await this.prisma.session.findMany({
      where: {
        id: { in: data.sessionIds },
        isBooked: false,
      },
    });

    if (sessions.length !== data.sessionIds.length) {
      throw new BadRequestException('Some sessions are already booked');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.session.updateMany({
        where: { id: { in: data.sessionIds } },
        data: { isBooked: true },
      });

      return tx.booking.create({
        data: {
          clientName: data.clientName,
          email: data.email,
          phone: data.phone,
          totalCost: data.totalCost,
          sessions: {
            connect: data.sessionIds.map((id) => ({ id })),
          },
        },
      });
    });
  }
}
