import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityGetFeedsResponse =
  paths['/feeds']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_GET_FEEDS = new InjectionToken<
  () => ReturnType<typeof httpResource<ActivityGetFeedsResponse>>
>('ACTIVITY_GET_FEEDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<ActivityGetFeedsResponse>(() => ({
        url: `${base}/feeds`,
      }));
  },
});
