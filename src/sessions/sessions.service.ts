import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from 'src/dto/create-session.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async getAllSessions() {
    return this.prisma.session.findMany({
      where: { isBooked: false },
      include: { trainer: true },
    });
  }

  async createSession(data: CreateSessionDto) {
    return this.prisma.session.create({
      data: {
        ...data,
        isBooked: false,
      },
    });
  }
}
