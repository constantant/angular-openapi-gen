import { InjectionToken } from '@angular/core';

export const TRAVEL_BASE_URL = new InjectionToken<string>('TRAVEL_BASE_URL', {
  providedIn: 'root',
  factory: () => '',
});
