import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { SessionsModule } from './sessions/sessions.module';
import { BookingsModule } from './booking/bookings.module';
import { TrainersModule } from './trainers/trainers.module';

@Module({
  imports: [SessionsModule, BookingsModule, TrainersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
