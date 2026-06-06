import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSubscriptionsParams =
  paths['/v1/subscriptions']['get']['parameters']['query'];

export type GetSubscriptionsResponse =
  paths['/v1/subscriptions']['get']['responses']['200']['content']['application/json'];

export const GET_SUBSCRIPTIONS = new InjectionToken<
  (
    params?:
      | GetSubscriptionsParams
      | (() => GetSubscriptionsParams | undefined),
  ) => ReturnType<typeof httpResource<GetSubscriptionsResponse>>
>('GET_SUBSCRIPTIONS');

export function provideGetSubscriptions(): FactoryProvider {
  return {
    provide: GET_SUBSCRIPTIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetSubscriptionsParams
          | (() => GetSubscriptionsParams | undefined),
      ) =>
        httpResource<GetSubscriptionsResponse>(() => ({
          url: `${base}/v1/subscriptions`,
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
