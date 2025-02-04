import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  clientName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  trainerAvailabilityIds: string[];

  @IsString()
  durationId: string;

  @IsNumber()
  totalCost: number;
}
