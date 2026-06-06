import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

export const LIST_TRIPS = new InjectionToken<
  () => ReturnType<typeof httpResource<unknown[]>>
>('LIST_TRIPS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(TRAVEL_BASE_URL);
    return () =>
      httpResource<unknown[]>(() => ({ url: `${base}/trips` }));
  },
});
