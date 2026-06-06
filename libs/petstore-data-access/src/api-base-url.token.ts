import { InjectionToken } from '@angular/core';

export const PETSTORE_BASE_URL = new InjectionToken<string>(
  'PETSTORE_BASE_URL',
  { providedIn: 'root', factory: () => '' },
);
