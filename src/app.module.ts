import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { SessionModule } from './session/session.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [SessionModule, BookingModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
