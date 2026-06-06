import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPaymentRecordsIdReportPaymentAttemptInformationalBody =
  NonNullable<
    paths['/v1/payment_records/{id}/report_payment_attempt_informational']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostPaymentRecordsIdReportPaymentAttemptInformationalResponse =
  paths['/v1/payment_records/{id}/report_payment_attempt_informational']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT_INFORMATIONAL =
  new InjectionToken<
    (
      id: string,
      body:
        | PostPaymentRecordsIdReportPaymentAttemptInformationalBody
        | Signal<PostPaymentRecordsIdReportPaymentAttemptInformationalBody>,
    ) => ReturnType<
      typeof httpResource<PostPaymentRecordsIdReportPaymentAttemptInformationalResponse>
    >
  >('POST_PAYMENT_RECORDS_ID_REPORT_PAYMENT_ATTEMPT_INFORMATIONAL', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        id: string,
        body:
          | PostPaymentRecordsIdReportPaymentAttemptInformationalBody
          | Signal<PostPaymentRecordsIdReportPaymentAttemptInformationalBody>,
      ) =>
        httpResource<PostPaymentRecordsIdReportPaymentAttemptInformationalResponse>(
          () => ({
            url: `${base}/v1/payment_records/${id}/report_payment_attempt_informational`,
            method: 'POST',
            body,
          }),
        );
    },
  });
