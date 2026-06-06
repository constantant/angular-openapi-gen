import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentMethodConfigurationsConfigurationBody = NonNullable<
  paths['/v1/payment_method_configurations/{configuration}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentMethodConfigurationsConfigurationResponse =
  paths['/v1/payment_method_configurations/{configuration}']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_METHOD_CONFIGURATIONS_CONFIGURATION =
  new InjectionToken<
    (
      configuration: string,
      body:
        | PostPaymentMethodConfigurationsConfigurationBody
        | Signal<PostPaymentMethodConfigurationsConfigurationBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentMethodConfigurationsConfigurationResponse>
    >
  >('POST_PAYMENT_METHOD_CONFIGURATIONS_CONFIGURATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        configuration: string,
        body:
          | PostPaymentMethodConfigurationsConfigurationBody
          | Signal<PostPaymentMethodConfigurationsConfigurationBody>,
      ) =>
        httpResource<PostPaymentMethodConfigurationsConfigurationResponse>(
          () => ({
            url: `${base}/v1/payment_method_configurations/${configuration}`,
            method: 'POST',
            body,
          }),
        );
    },
  });
