/* eslint-disable @typescript-eslint/no-unsafe-call */
import { SessionType } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsEnum(SessionType)
  type: SessionType;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @IsString()
  trainer: string;

  @IsNumber()
  price: number;

  @IsNumber()
  capacity: number;
}
