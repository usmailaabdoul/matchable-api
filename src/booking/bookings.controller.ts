import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from 'src/dto/create-book.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // @Post()
  // async createBooking(@Body() bookingData: CreateBookingDto): Promise<Booking> {
  //   return this.bookingsService.createBooking(bookingData);
  // }

  @Post()
  createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }
}
