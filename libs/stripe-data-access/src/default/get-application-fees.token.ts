import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetApplicationFeesParams =
  paths['/v1/application_fees']['get']['parameters']['query'];

type GetApplicationFeesResponse =
  paths['/v1/application_fees']['get']['responses']['200']['content']['application/json'];

export const GET_APPLICATION_FEES = new InjectionToken<
  (
    params?: GetApplicationFeesParams,
  ) => ReturnType<typeof httpResource<GetApplicationFeesResponse>>
>('GET_APPLICATION_FEES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetApplicationFeesParams) =>
      httpResource<GetApplicationFeesResponse>(() => ({
        url: `${base}/v1/application_fees`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
