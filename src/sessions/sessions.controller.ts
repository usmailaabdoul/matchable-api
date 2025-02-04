import { Body, Controller, Get, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from 'src/dto/create-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  getAllSessions() {
    return this.sessionsService.getAllSessions();
  }

  // @Post()
  // createSession(@Body() createSessionDto: CreateSessionDto) {
  //   return this.sessionsService.createSession(createSessionDto);
  // }
}
