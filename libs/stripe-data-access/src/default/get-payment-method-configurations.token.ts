import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentMethodConfigurationsParams =
  paths['/v1/payment_method_configurations']['get']['parameters']['query'];

export type GetPaymentMethodConfigurationsResponse =
  paths['/v1/payment_method_configurations']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHOD_CONFIGURATIONS = new InjectionToken<
  (
    params?:
      | GetPaymentMethodConfigurationsParams
      | (() => GetPaymentMethodConfigurationsParams | undefined),
  ) => ReturnType<typeof httpResource<GetPaymentMethodConfigurationsResponse>>
>('GET_PAYMENT_METHOD_CONFIGURATIONS');

export function provideGetPaymentMethodConfigurations(): FactoryProvider {
  return {
    provide: GET_PAYMENT_METHOD_CONFIGURATIONS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetPaymentMethodConfigurationsParams
          | (() => GetPaymentMethodConfigurationsParams | undefined),
      ) =>
        httpResource<GetPaymentMethodConfigurationsResponse>(() => ({
          url: `${base}/v1/payment_method_configurations`,
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
