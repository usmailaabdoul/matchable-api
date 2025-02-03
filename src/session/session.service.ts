import { Injectable } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import { CreateSessionDto } from 'src/dto/create-session.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async sessions(where: Prisma.SessionWhereInput): Promise<Session[]> {
    return this.prisma.session.findMany({ where });
  }

  async createSession(data: CreateSessionDto) {
    return this.prisma.session.create({
      data,
    });
  }
}
