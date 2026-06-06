import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentRecordsIdReportPaymentAttemptBody = NonNullable<
  paths['/v1/payment_records/{id}/report_payment_attempt']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentRecordsIdReportPaymentAttemptResponse =
  paths['/v1/payment_records/{id}/report_payment_attempt']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT =
  new InjectionToken<
    (
      id: string,
      body:
        | PostPaymentRecordsIdReportPaymentAttemptBody
        | Signal<PostPaymentRecordsIdReportPaymentAttemptBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentRecordsIdReportPaymentAttemptResponse>
    >
  >('POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostPaymentRecordsIdReportPaymentAttemptBody
          | Signal<PostPaymentRecordsIdReportPaymentAttemptBody>,
      ) =>
        httpResource<PostPaymentRecordsIdReportPaymentAttemptResponse>(() => ({
          url: `${base}/v1/payment_records/${id}/report_payment_attempt`,
          method: 'POST',
          body,
        }));
    },
  });
