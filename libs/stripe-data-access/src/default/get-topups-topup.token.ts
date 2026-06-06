import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTopupsTopupParams =
  paths['/v1/topups/{topup}']['get']['parameters']['query'];

type GetTopupsTopupResponse =
  paths['/v1/topups/{topup}']['get']['responses']['200']['content']['application/json'];

export const GET_TOPUPS_TOPUP = new InjectionToken<
  (
    topup: string,
    params?: GetTopupsTopupParams,
  ) => ReturnType<typeof httpResource<GetTopupsTopupResponse>>
>('GET_TOPUPS_TOPUP', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (topup: string, params?: GetTopupsTopupParams) =>
      httpResource<GetTopupsTopupResponse>(() => ({
        url: `${base}/v1/topups/${topup}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
