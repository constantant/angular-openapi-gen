import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentMethodConfigurationsParams =
  paths['/v1/payment_method_configurations']['get']['parameters']['query'];

type GetPaymentMethodConfigurationsResponse =
  paths['/v1/payment_method_configurations']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_METHOD_CONFIGURATIONS = new InjectionToken<
  (
    params?: GetPaymentMethodConfigurationsParams,
  ) => ReturnType<typeof httpResource<GetPaymentMethodConfigurationsResponse>>
>('GET_PAYMENT_METHOD_CONFIGURATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetPaymentMethodConfigurationsParams) =>
      httpResource<GetPaymentMethodConfigurationsResponse>(() => ({
        url: `${base}/v1/payment_method_configurations`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
