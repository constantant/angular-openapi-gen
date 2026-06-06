import { InjectionToken, Signal } from '@angular/core';

export const PETSTORE_AUTH = new InjectionToken<Signal<string | null>>(
  'PETSTORE_AUTH',
);
