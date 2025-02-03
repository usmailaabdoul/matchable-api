/* eslint-disable @typescript-eslint/no-unsafe-call */
import { SessionType } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsEnum(SessionType)
  type: SessionType;

  @IsNumber()
  duration: number;

  @IsNumber()
  price: number;

  @IsDate()
  startTime: Date;

  @IsString()
  trainerId: string;
}
