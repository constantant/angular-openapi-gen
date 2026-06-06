import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetForwardingRequestsParams =
  paths['/v1/forwarding/requests']['get']['parameters']['query'];

export type GetForwardingRequestsResponse =
  paths['/v1/forwarding/requests']['get']['responses']['200']['content']['application/json'];

export const GET_FORWARDING_REQUESTS = new InjectionToken<
  (
    params?:
      | GetForwardingRequestsParams
      | (() => GetForwardingRequestsParams | undefined),
  ) => ReturnType<typeof httpResource<GetForwardingRequestsResponse>>
>('GET_FORWARDING_REQUESTS');

export function provideGetForwardingRequests(): FactoryProvider {
  return {
    provide: GET_FORWARDING_REQUESTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetForwardingRequestsParams
          | (() => GetForwardingRequestsParams | undefined),
      ) =>
        httpResource<GetForwardingRequestsResponse>(() => ({
          url: `${base}/v1/forwarding/requests`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
