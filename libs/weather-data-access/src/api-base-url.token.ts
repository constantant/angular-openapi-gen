import { InjectionToken } from '@angular/core';

export const WEATHER_BASE_URL = new InjectionToken<string>('WEATHER_BASE_URL', {
  providedIn: 'root',
  factory: () => '',
});
