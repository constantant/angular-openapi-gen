import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetPaymentAttemptRecordsParams =
  paths['/v1/payment_attempt_records']['get']['parameters']['query'];

export type GetPaymentAttemptRecordsResponse =
  paths['/v1/payment_attempt_records']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_ATTEMPT_RECORDS = new InjectionToken<
  (
    params?:
      | GetPaymentAttemptRecordsParams
      | (() => GetPaymentAttemptRecordsParams | undefined),
  ) => ReturnType<typeof httpResource<GetPaymentAttemptRecordsResponse>>
>('GET_PAYMENT_ATTEMPT_RECORDS');

export function provideGetPaymentAttemptRecords(): FactoryProvider {
  return {
    provide: GET_PAYMENT_ATTEMPT_RECORDS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetPaymentAttemptRecordsParams
          | (() => GetPaymentAttemptRecordsParams | undefined),
      ) =>
        httpResource<GetPaymentAttemptRecordsResponse>(() => ({
          url: `${base}/v1/payment_attempt_records`,
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
