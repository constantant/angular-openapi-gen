import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const META_GET_ZEN = new InjectionToken<
  () => ReturnType<typeof httpResource<unknown>>
>('META_GET_ZEN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<unknown>(() => ({
        url: `${base}/zen`,
      }));
  },
});
