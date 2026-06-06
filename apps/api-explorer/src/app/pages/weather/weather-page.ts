import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { GET_V1_FORECAST } from '@angular-openapi-gen/weather-data-access';

@Component({
  selector: 'app-weather-page',
  imports: [JsonPipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './weather-page.html',
})
export class WeatherPageComponent {
  private getForecast = inject(GET_V1_FORECAST);

  // Amsterdam
  readonly forecast = this.getForecast({
    latitude: '52.374',
    longitude: '4.89',
    current: ['temperature_2m', 'wind_speed_10m', 'weather_code'],
    daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum'],
    timezone: 'Europe/Amsterdam',
    forecast_days: 3,
  });
}
