import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentRecordsIdReportPaymentAttemptCanceledBody = NonNullable<
  paths['/v1/payment_records/{id}/report_payment_attempt_canceled']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentRecordsIdReportPaymentAttemptCanceledResponse =
  paths['/v1/payment_records/{id}/report_payment_attempt_canceled']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT_CANCELED =
  new InjectionToken<
    (
      id: string,
      body:
        | PostPaymentRecordsIdReportPaymentAttemptCanceledBody
        | Signal<PostPaymentRecordsIdReportPaymentAttemptCanceledBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentRecordsIdReportPaymentAttemptCanceledResponse>
    >
  >('POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT_CANCELED');

export function providePostPaymentRecordsIdReportPaymentAttemptCanceled(): FactoryProvider {
  return {
    provide: POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT_CANCELED,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostPaymentRecordsIdReportPaymentAttemptCanceledBody
          | Signal<PostPaymentRecordsIdReportPaymentAttemptCanceledBody>,
      ) =>
        httpResource<PostPaymentRecordsIdReportPaymentAttemptCanceledResponse>(
          () => ({
            url: `${base}/v1/payment_records/${id}/report_payment_attempt_canceled`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
