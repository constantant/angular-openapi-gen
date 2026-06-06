import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSubscriptionsSearchParams =
  paths['/v1/subscriptions/search']['get']['parameters']['query'];

export type GetSubscriptionsSearchResponse =
  paths['/v1/subscriptions/search']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTIONS_SEARCH = new InjectionToken<
  (
    params?:
      | GetSubscriptionsSearchParams
      | (() => GetSubscriptionsSearchParams | undefined),
  ) => ReturnType<typeof httpResource<GetSubscriptionsSearchResponse>>
>('GET_SUBSCRIPTIONS_SEARCH');

export function provideGetSubscriptionsSearch(): FactoryProvider {
  return {
    provide: GET_SUBSCRIPTIONS_SEARCH,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetSubscriptionsSearchParams
          | (() => GetSubscriptionsSearchParams | undefined),
      ) =>
        httpResource<GetSubscriptionsSearchResponse>(() => ({
          url: `${base}/v1/subscriptions/search`,
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
