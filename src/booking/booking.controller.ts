import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from '@prisma/client';
import { CreateBookingDto } from 'src/dto/create-book.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() bookingData: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(bookingData);
  }
}
