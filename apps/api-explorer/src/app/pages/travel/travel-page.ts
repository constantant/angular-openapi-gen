import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GET_TRIPS, GET_BOOKINGS } from '@angular-openapi-gen/travel-data-access';

@Component({
  selector: 'app-travel-page',
  imports: [JsonPipe],
  templateUrl: './travel-page.html',
})
export class TravelPageComponent {
  private getTrips = inject(GET_TRIPS);
  private getBookings = inject(GET_BOOKINGS);

  readonly trips = this.getTrips();
  readonly bookings = this.getBookings();
}
