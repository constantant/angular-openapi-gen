import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentRecordsIdReportPaymentAttemptFailedBody = NonNullable<
  paths['/v1/payment_records/{id}/report_payment_attempt_failed']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentRecordsIdReportPaymentAttemptFailedResponse =
  paths['/v1/payment_records/{id}/report_payment_attempt_failed']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT_FAILED =
  new InjectionToken<
    (
      id: string,
      body:
        | PostPaymentRecordsIdReportPaymentAttemptFailedBody
        | Signal<PostPaymentRecordsIdReportPaymentAttemptFailedBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentRecordsIdReportPaymentAttemptFailedResponse>
    >
  >('POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT_FAILED', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostPaymentRecordsIdReportPaymentAttemptFailedBody
          | Signal<PostPaymentRecordsIdReportPaymentAttemptFailedBody>,
      ) =>
        httpResource<PostPaymentRecordsIdReportPaymentAttemptFailedResponse>(
          () => ({
            url: `${base}/v1/payment_records/${id}/report_payment_attempt_failed`,
            method: 'POST',
            body,
          }),
        );
    },
  });
