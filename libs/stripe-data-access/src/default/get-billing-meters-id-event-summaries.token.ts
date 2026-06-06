import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetBillingMetersIdEventSummariesParams =
  paths['/v1/billing/meters/{id}/event_summaries']['get']['parameters']['query'];

type GetBillingMetersIdEventSummariesResponse =
  paths['/v1/billing/meters/{id}/event_summaries']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_METERS_ID_EVENT_SUMMARIES = new InjectionToken<
  (
    id: string,
    params?: GetBillingMetersIdEventSummariesParams,
  ) => ReturnType<typeof httpResource<GetBillingMetersIdEventSummariesResponse>>
>('GET_BILLING_METERS_ID_EVENT_SUMMARIES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetBillingMetersIdEventSummariesParams) =>
      httpResource<GetBillingMetersIdEventSummariesResponse>(() => ({
        url: `${base}/v1/billing/meters/${id}/event_summaries`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
