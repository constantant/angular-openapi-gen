import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentRecordsIdReportPaymentAttemptGuaranteedBody =
  NonNullable<
    paths['/v1/payment_records/{id}/report_payment_attempt_guaranteed']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostPaymentRecordsIdReportPaymentAttemptGuaranteedResponse =
  paths['/v1/payment_records/{id}/report_payment_attempt_guaranteed']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT_GUARANTEED =
  new InjectionToken<
    (
      id: string,
      body:
        | PostPaymentRecordsIdReportPaymentAttemptGuaranteedBody
        | Signal<PostPaymentRecordsIdReportPaymentAttemptGuaranteedBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentRecordsIdReportPaymentAttemptGuaranteedResponse>
    >
  >('POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT_GUARANTEED', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostPaymentRecordsIdReportPaymentAttemptGuaranteedBody
          | Signal<PostPaymentRecordsIdReportPaymentAttemptGuaranteedBody>,
      ) =>
        httpResource<PostPaymentRecordsIdReportPaymentAttemptGuaranteedResponse>(
          () => ({
            url: `${base}/v1/payment_records/${id}/report_payment_attempt_guaranteed`,
            method: 'POST',
            body,
          }),
        );
    },
  });
