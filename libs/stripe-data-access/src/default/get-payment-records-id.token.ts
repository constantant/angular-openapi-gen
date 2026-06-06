import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentRecordsIdParams =
  paths['/v1/payment_records/{id}']['get']['parameters']['query'];

export type GetPaymentRecordsIdResponse =
  paths['/v1/payment_records/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_RECORDS_ID = new InjectionToken<
  (
    id: string,
    params?:
      | GetPaymentRecordsIdParams
      | (() => GetPaymentRecordsIdParams | undefined),
  ) => ReturnType<typeof httpResource<GetPaymentRecordsIdResponse>>
>('GET_PAYMENT_RECORDS_ID');

export function provideGetPaymentRecordsId(): FactoryProvider {
  return {
    provide: GET_PAYMENT_RECORDS_ID,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        params?:
          | GetPaymentRecordsIdParams
          | (() => GetPaymentRecordsIdParams | undefined),
      ) =>
        httpResource<GetPaymentRecordsIdResponse>(() => ({
          url: `${base}/v1/payment_records/${id}`,
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
