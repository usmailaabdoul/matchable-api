/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  clientName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  sessionIds: string[];

  @IsNumber()
  totalCost: number;
}
