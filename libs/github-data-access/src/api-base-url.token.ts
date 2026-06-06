import { InjectionToken } from '@angular/core';

export const GITHUB_BASE_URL = new InjectionToken<string>('GITHUB_BASE_URL', {
  providedIn: 'root',
  factory: () => '',
});
