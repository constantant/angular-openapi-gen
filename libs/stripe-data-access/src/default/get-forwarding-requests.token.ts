import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetForwardingRequestsParams =
  paths['/v1/forwarding/requests']['get']['parameters']['query'];

type GetForwardingRequestsResponse =
  paths['/v1/forwarding/requests']['get']['responses']['200']['content']['application/json'];

export const GET_FORWARDING_REQUESTS = new InjectionToken<
  (
    params?: GetForwardingRequestsParams,
  ) => ReturnType<typeof httpResource<GetForwardingRequestsResponse>>
>('GET_FORWARDING_REQUESTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetForwardingRequestsParams) =>
      httpResource<GetForwardingRequestsResponse>(() => ({
        url: `${base}/v1/forwarding/requests`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
