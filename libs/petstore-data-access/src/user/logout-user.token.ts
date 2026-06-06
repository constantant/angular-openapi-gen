import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export const LOGOUT_USER = new InjectionToken<
  () => ReturnType<typeof httpResource<unknown>>
>('LOGOUT_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return () =>
      httpResource<unknown>(() => ({
        url: `${base}/user/logout`,
      }));
  },
});
