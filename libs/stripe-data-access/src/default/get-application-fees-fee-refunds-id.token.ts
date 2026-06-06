import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetApplicationFeesFeeRefundsIdParams =
  paths['/v1/application_fees/{fee}/refunds/{id}']['get']['parameters']['query'];

export type GetApplicationFeesFeeRefundsIdResponse =
  paths['/v1/application_fees/{fee}/refunds/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_APPLICATION_FEES_FEE_REFUNDS_ID = new InjectionToken<
  (
    fee: string,
    id: string,
    params?:
      | GetApplicationFeesFeeRefundsIdParams
      | (() => GetApplicationFeesFeeRefundsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetApplicationFeesFeeRefundsIdResponse>>
>('GET_APPLICATION_FEES_FEE_REFUNDS_ID');

export function provideGetApplicationFeesFeeRefundsId(): FactoryProvider {
  return {
    provide: GET_APPLICATION_FEES_FEE_REFUNDS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        fee: string,
        id: string,
        params?:
          | GetApplicationFeesFeeRefundsIdParams
          | (() => GetApplicationFeesFeeRefundsIdParams | undefined),
      ) =>
        httpResource<GetApplicationFeesFeeRefundsIdResponse>(() => ({
          url: `${base}/v1/application_fees/${fee}/refunds/${id}`,
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
