import { InjectionToken } from '@angular/core';

export const YOUTUBE_BASE_URL = new InjectionToken<string>('YOUTUBE_BASE_URL', {
  providedIn: 'root',
  factory: () => '',
});
