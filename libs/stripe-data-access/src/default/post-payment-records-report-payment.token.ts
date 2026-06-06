import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentRecordsReportPaymentBody = NonNullable<
  paths['/v1/payment_records/report_payment']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPaymentRecordsReportPaymentResponse =
  paths['/v1/payment_records/report_payment']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_RECORDS_REPORT_PAYMENT = new InjectionToken<
  (
    body:
      | PostPaymentRecordsReportPaymentBody
      | Signal<PostPaymentRecordsReportPaymentBody>,
  ) => ReturnType<typeof httpResource<PostPaymentRecordsReportPaymentResponse>>
>('POST_PAYMENT_RECORDS_REPORT_PAYMENT');

export function providePostPaymentRecordsReportPayment(): FactoryProvider {
  return {
    provide: POST_PAYMENT_RECORDS_REPORT_PAYMENT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostPaymentRecordsReportPaymentBody
          | Signal<PostPaymentRecordsReportPaymentBody>,
      ) =>
        httpResource<PostPaymentRecordsReportPaymentResponse>(() => ({
          url: `${base}/v1/payment_records/report_payment`,
          method: 'POST',
          body,
        }));
    },
  };
}
