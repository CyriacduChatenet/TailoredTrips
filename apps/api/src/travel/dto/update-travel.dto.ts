import { UpdateTravelDTO } from '@travel-manager/types';

export class UpdateTravelDto implements UpdateTravelDTO {
  traveler?: string;
  activities: string[];
  departureCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;
}
