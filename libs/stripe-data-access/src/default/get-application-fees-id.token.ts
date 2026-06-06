import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetApplicationFeesIdParams =
  paths['/v1/application_fees/{id}']['get']['parameters']['query'];

export type GetApplicationFeesIdResponse =
  paths['/v1/application_fees/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_APPLICATION_FEES_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetApplicationFeesIdParams
      | (() => GetApplicationFeesIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetApplicationFeesIdResponse>>
>('GET_APPLICATION_FEES_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      params?:
        | GetApplicationFeesIdParams
        | (() => GetApplicationFeesIdParams | undefined),
    ) =>
      httpResource<GetApplicationFeesIdResponse>(() => ({
        url: `${base}/v1/application_fees/${id}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
