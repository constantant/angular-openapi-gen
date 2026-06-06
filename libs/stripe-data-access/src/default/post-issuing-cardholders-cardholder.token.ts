import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingCardholdersCardholderBody = NonNullable<
  paths['/v1/issuing/cardholders/{cardholder}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingCardholdersCardholderResponse =
  paths['/v1/issuing/cardholders/{cardholder}']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_CARDHOLDERS_CARDHOLDER = new InjectionToken<
  (
    cardholder: string,
    body:
      | PostIssuingCardholdersCardholderBody
      | Signal<PostIssuingCardholdersCardholderBody>,
  ) => ReturnType<typeof httpResource<PostIssuingCardholdersCardholderResponse>>
>('POST_ISSUING_CARDHOLDERS_CARDHOLDER');

export function providePostIssuingCardholdersCardholder(): FactoryProvider {
  return {
    provide: POST_ISSUING_CARDHOLDERS_CARDHOLDER,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        cardholder: string,
        body:
          | PostIssuingCardholdersCardholderBody
          | Signal<PostIssuingCardholdersCardholderBody>,
      ) =>
        httpResource<PostIssuingCardholdersCardholderResponse>(() => ({
          url: `${base}/v1/issuing/cardholders/${cardholder}`,
          method: 'POST',
          body,
        }));
    },
  };
}
