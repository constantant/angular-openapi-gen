import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTopupsParams = paths['/v1/topups']['get']['parameters']['query'];

type GetTopupsResponse =
  paths['/v1/topups']['get']['responses']['200']['content']['application/json'];

export const GET_TOPUPS = new InjectionToken<
  (
    params?: GetTopupsParams,
  ) => ReturnType<typeof httpResource<GetTopupsResponse>>
>('GET_TOPUPS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTopupsParams) =>
      httpResource<GetTopupsResponse>(() => ({
        url: `${base}/v1/topups`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
