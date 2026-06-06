import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type RateLimitGetResponse =
  paths['/rate_limit']['get']['responses']['200']['content']['application/json'];

export const RATE_LIMIT_GET = new InjectionToken<
  () => ReturnType<typeof httpResource<RateLimitGetResponse>>
>('RATE_LIMIT_GET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<RateLimitGetResponse>(() => ({
        url: `${base}/rate_limit`,
      }));
  },
});
