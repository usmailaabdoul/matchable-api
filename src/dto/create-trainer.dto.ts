/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEnum } from 'class-validator';

export enum TrainerSpecialty {
  PADEL = 'PADEL',
  FITNESS = 'FITNESS',
  TENNIS = 'TENNIS',
  MULTI = 'MULTI',
}

export class CreateTrainerDto {
  @IsString()
  name: string;

  @IsEnum(TrainerSpecialty)
  specialty: TrainerSpecialty;
}
