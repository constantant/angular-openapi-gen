import { InjectionToken } from '@angular/core';

export const TASKS_BASE_URL = new InjectionToken<string>('TASKS_BASE_URL', {
  providedIn: 'root',
  factory: () => '',
});
