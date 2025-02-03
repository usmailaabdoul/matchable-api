import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Prisma, Session, SessionType } from '@prisma/client';
import { SessionService } from './session.service';
import { CreateSessionDto } from 'src/dto/create-session.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async findAll(
    @Query('type') type?: SessionType,
    @Query('trainer') trainer?: string,
    @Query('date') date?: string,
  ): Promise<Session[]> {
    const where: Prisma.SessionWhereInput = {};

    if (type) where.type = type;
    if (trainer) where.trainer = { contains: trainer };
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      where.startTime = { gte: startDate, lte: endDate };
    }

    return await this.sessionService.sessions(where);
  }

  @Post()
  async createSession(@Body() sessionData: CreateSessionDto): Promise<Session> {
    return this.sessionService.createSession(sessionData);
  }
}
