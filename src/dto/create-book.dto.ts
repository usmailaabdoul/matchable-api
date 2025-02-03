/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsString,
  Length,
} from 'class-validator';

export class CreateBookingDto {
  @IsArray()
  @ArrayNotEmpty()
  sessionIds: string[];

  @IsString()
  @Length(2, 50)
  userName: string;
  /**
   * @example "johndoe@gmail.com"
   */
  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
