import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetBillingMetersIdEventSummariesParams =
  paths['/v1/billing/meters/{id}/event_summaries']['get']['parameters']['query'];

export type GetBillingMetersIdEventSummariesResponse =
  paths['/v1/billing/meters/{id}/event_summaries']['get']['responses']['200']['content']['application/json'];

export const GET_BILLING_METERS_ID_EVENT_SUMMARIES = new InjectionToken<
  (
    id: string,
    params?:
      | GetBillingMetersIdEventSummariesParams
      | (() => GetBillingMetersIdEventSummariesParams | undefined),
  ) => ReturnType<typeof httpResource<GetBillingMetersIdEventSummariesResponse>>
>('GET_BILLING_METERS_ID_EVENT_SUMMARIES');

export function provideGetBillingMetersIdEventSummaries(): FactoryProvider {
  return {
    provide: GET_BILLING_METERS_ID_EVENT_SUMMARIES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetBillingMetersIdEventSummariesParams
          | (() => GetBillingMetersIdEventSummariesParams | undefined),
      ) =>
        httpResource<GetBillingMetersIdEventSummariesResponse>(() => ({
          url: `${base}/v1/billing/meters/${id}/event_summaries`,
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
