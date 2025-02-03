import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from 'src/dto/create-trainer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainersService {
  constructor(private prisma: PrismaService) {}

  async createTrainer(data: CreateTrainerDto) {
    return this.prisma.trainer.create({ data });
  }

  async getAllTrainers() {
    return this.prisma.trainer.findMany();
  }
}
