import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentMethodConfigurationsConfigurationParams =
  paths['/v1/payment_method_configurations/{configuration}']['get']['parameters']['query'];

export type GetPaymentMethodConfigurationsConfigurationResponse =
  paths['/v1/payment_method_configurations/{configuration}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHOD_CONFIGURATIONS_CONFIGURATION =
  new InjectionToken<
    (
      configuration: string,
      params?:
        | GetPaymentMethodConfigurationsConfigurationParams
        | (() => GetPaymentMethodConfigurationsConfigurationParams | undefined),
    ) => ReturnType<
      typeof httpResource<GetPaymentMethodConfigurationsConfigurationResponse>
    >
  >('GET_PAYMENT_METHOD_CONFIGURATIONS_CONFIGURATION');

export function provideGetPaymentMethodConfigurationsConfiguration(): FactoryProvider {
  return {
    provide: GET_PAYMENT_METHOD_CONFIGURATIONS_CONFIGURATION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        configuration: string,
        params?:
          | GetPaymentMethodConfigurationsConfigurationParams
          | (() =>
              | GetPaymentMethodConfigurationsConfigurationParams
              | undefined),
      ) =>
        httpResource<GetPaymentMethodConfigurationsConfigurationResponse>(
          () => ({
            url: `${base}/v1/payment_method_configurations/${configuration}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
