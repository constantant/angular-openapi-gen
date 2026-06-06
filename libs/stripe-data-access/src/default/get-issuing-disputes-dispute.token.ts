import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetIssuingDisputesDisputeParams =
  paths['/v1/issuing/disputes/{dispute}']['get']['parameters']['query'];

type GetIssuingDisputesDisputeResponse =
  paths['/v1/issuing/disputes/{dispute}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_DISPUTES_DISPUTE = new InjectionToken<
  (
    dispute: string,
    params?: GetIssuingDisputesDisputeParams,
  ) => ReturnType<typeof httpResource<GetIssuingDisputesDisputeResponse>>
>('GET_ISSUING_DISPUTES_DISPUTE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (dispute: string, params?: GetIssuingDisputesDisputeParams) =>
      httpResource<GetIssuingDisputesDisputeResponse>(() => ({
        url: `${base}/v1/issuing/disputes/${dispute}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
