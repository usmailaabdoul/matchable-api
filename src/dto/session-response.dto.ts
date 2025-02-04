export class SessionResponseDto {
  id: string;
  type: string;
  durations: {
    id: string;
    minutes: number;
    price: number;
  }[];
  timeSlots: {
    id: string;
    startTime: Date;
    availableTrainers: {
      id: string;
      trainerId: string;
      trainerName: string;
      isBooked: boolean;
    }[];
  }[];
}
