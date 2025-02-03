import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTrainerDto } from 'src/dto/create-trainer.dto';
import { TrainersService } from './trainers.service';

@Controller('trainers')
export class TrainersController {
  constructor(private trainersService: TrainersService) {}

  @Post()
  createTrainer(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainersService.createTrainer(createTrainerDto);
  }

  @Get()
  getAllTrainers() {
    return this.trainersService.getAllTrainers();
  }
}
