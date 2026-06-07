import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  USERS_GET_BY_USERNAME,
  REPOS_LIST_FOR_USER,
} from '@angular-openapi-gen/github-data-access';
import { FIND_PETS_BY_STATUS } from '@angular-openapi-gen/petstore-data-access';
import { GET_V1_FORECAST } from '@angular-openapi-gen/weather-data-access';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatProgressBarModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private getUser = inject(USERS_GET_BY_USERNAME);
  private listRepos = inject(REPOS_LIST_FOR_USER);
  private findPetsByStatus = inject(FIND_PETS_BY_STATUS);
  private getForecast = inject(GET_V1_FORECAST);

  readonly user = this.getUser('angular');
  readonly repos = this.listRepos('angular');
  readonly pets = this.findPetsByStatus({ status: 'available' });
  readonly forecast = this.getForecast({
    latitude: '52.374',
    longitude: '4.89',
    current: ['temperature_2m', 'weather_code'],
    timezone: 'Europe/Amsterdam',
  });
}
