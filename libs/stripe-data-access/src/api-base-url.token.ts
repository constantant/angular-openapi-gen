import { InjectionToken } from '@angular/core';

export const STRIPE_BASE_URL = new InjectionToken<string>('STRIPE_BASE_URL', {
  providedIn: 'root',
  factory: () => '',
});
