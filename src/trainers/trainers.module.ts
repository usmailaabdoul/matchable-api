import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrainersController } from './trainers.controller';

@Module({
  controllers: [TrainersController],
  providers: [TrainersService, PrismaService],
})
export class TrainersModule {}
