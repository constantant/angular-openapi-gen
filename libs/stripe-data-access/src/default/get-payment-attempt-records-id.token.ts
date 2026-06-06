import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPaymentAttemptRecordsIdParams =
  paths['/v1/payment_attempt_records/{id}']['get']['parameters']['query'];

type GetPaymentAttemptRecordsIdResponse =
  paths['/v1/payment_attempt_records/{id}']['get']['responses']['200']['content']['application/json'];

export const GET_PAYMENT_ATTEMPT_RECORDS_ID = new InjectionToken<
  (
    id: string,
    params?: GetPaymentAttemptRecordsIdParams,
  ) => ReturnType<typeof httpResource<GetPaymentAttemptRecordsIdResponse>>
>('GET_PAYMENT_ATTEMPT_RECORDS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (id: string, params?: GetPaymentAttemptRecordsIdParams) =>
      httpResource<GetPaymentAttemptRecordsIdResponse>(() => ({
        url: `${base}/v1/payment_attempt_records/${id}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
