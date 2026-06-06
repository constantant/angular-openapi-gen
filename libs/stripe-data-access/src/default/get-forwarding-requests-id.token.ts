import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetForwardingRequestsIdParams =
  paths['/v1/forwarding/requests/{id}']['get']['parameters']['query'];

type GetForwardingRequestsIdResponse =
  paths['/v1/forwarding/requests/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_FORWARDING_REQUESTS_ID = new InjectionToken<
  (
    id: string,
    params?: GetForwardingRequestsIdParams,
  ) => ReturnType<typeof httpResource<GetForwardingRequestsIdResponse>>
>('GET_FORWARDING_REQUESTS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetForwardingRequestsIdParams) =>
      httpResource<GetForwardingRequestsIdResponse>(() => ({
        url: `${base}/v1/forwarding/requests/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
