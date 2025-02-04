/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from 'src/dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(data: CreateBookingDto) {
    const availabilities = await this.prisma.trainerAvailability.findMany({
      where: {
        id: {
          in: data.trainerAvailabilityIds,
        },
      },
      include: {
        timeSlot: true,
        trainer: true,
      },
    });

    if (availabilities.length !== data.trainerAvailabilityIds.length) {
      throw new BadRequestException(
        'One or more selected time slots do not exist',
      );
    }

    const bookedSlots = availabilities.filter((slot) => slot.isBooked);
    if (bookedSlots.length > 0) {
      const bookedDetails = bookedSlots.map((slot) => ({
        trainer: slot.trainer.name,
        time: slot.timeSlot.startTime,
      }));

      throw new BadRequestException({
        message: 'Some selected time slots are already booked',
        bookedSlots: bookedDetails,
      });
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.trainerAvailability.updateMany({
        where: {
          id: {
            in: data.trainerAvailabilityIds,
          },
        },
        data: { isBooked: true },
      });

      return tx.booking.create({
        data: {
          clientName: data.clientName,
          email: data.email,
          phone: data.phone,
          totalCost: data.totalCost,
          trainerSlots: {
            connect: data.trainerAvailabilityIds.map((id) => ({ id })),
          },
        },
        include: {
          trainerSlots: {
            include: {
              trainer: true,
              timeSlot: true,
            },
          },
        },
      });
    });
  }
}
