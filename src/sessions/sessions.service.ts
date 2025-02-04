/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionResponseDto } from 'src/dto/session-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async getAllSessions(): Promise<SessionResponseDto[]> {
    const sessions = await this.prisma.session.findMany({
      include: {
        durations: true,
        timeSlots: {
          include: {
            trainerAvailability: {
              include: {
                trainer: true,
              },
            },
          },
        },
      },
    });

    return sessions.map((session) => ({
      id: session.id,
      type: session.type,
      durations: session.durations.map((duration) => ({
        id: duration.id,
        minutes: duration.minutes,
        price: duration.price,
      })),
      timeSlots: session.timeSlots.map((slot) => ({
        id: slot.id,
        startTime: slot.startTime,
        availableTrainers: slot.trainerAvailability.map((availability) => ({
          id: availability.id,
          trainerId: availability.trainerId,
          trainerName: availability.trainer.name,
          isBooked: availability.isBooked,
        })),
      })),
    }));
  }

  async getAvailableTimeSlots(sessionId: string, durationId: string) {
    const duration = await this.prisma.duration.findUnique({
      where: { id: durationId },
    });

    if (!duration) {
      throw new NotFoundException('Duration not found');
    }

    const timeSlots = await this.prisma.timeSlot.findMany({
      where: {
        sessionId,
        trainerAvailability: {
          some: {
            isBooked: false,
          },
        },
      },
      include: {
        session: {
          include: {
            durations: {
              where: {
                id: durationId,
              },
            },
          },
        },
        trainerAvailability: {
          where: {
            isBooked: false,
          },
          include: {
            trainer: true,
          },
        },
      },
    });

    return timeSlots.map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      duration: duration.minutes,
      price: duration.price,
      availableTrainers: slot.trainerAvailability.map((availability) => ({
        id: availability.id,
        trainerId: availability.trainerId,
        trainerName: availability.trainer.name,
      })),
    }));
  }
}
