import { Component, inject } from '@angular/core';
import {
  USERS_GET_BY_USERNAME,
  REPOS_LIST_FOR_USER,
} from '@angular-openapi-gen/github-data-access';
import { FIND_PETS_BY_STATUS } from '@angular-openapi-gen/petstore-data-access';
import { GET_TRIPS, GET_BOOKINGS } from '@angular-openapi-gen/travel-data-access';
import { GET_INVOICES } from '@angular-openapi-gen/stripe-data-access';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private getUser = inject(USERS_GET_BY_USERNAME);
  private listRepos = inject(REPOS_LIST_FOR_USER);
  private findPetsByStatus = inject(FIND_PETS_BY_STATUS);
  private getTrips = inject(GET_TRIPS);
  private getBookings = inject(GET_BOOKINGS);
  private getInvoices = inject(GET_INVOICES);

  readonly user = this.getUser('angular');
  readonly repos = this.listRepos('angular');
  readonly pets = this.findPetsByStatus({ status: 'available' });
  readonly trips = this.getTrips();
  readonly bookings = this.getBookings();
  readonly invoices = this.getInvoices();
}
