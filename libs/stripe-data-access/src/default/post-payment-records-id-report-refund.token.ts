import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostPaymentRecordsIdReportRefundBody = NonNullable<
  paths['/v1/payment_records/{id}/report_refund']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostPaymentRecordsIdReportRefundResponse =
  paths['/v1/payment_records/{id}/report_refund']['post']['responses']['200']['content']['application/json'];

export const POST_PAYMENT_RECORDS_ID_REPORT_REFUND = new InjectionToken<
  (
    id: string,
    body:
      | PostPaymentRecordsIdReportRefundBody
      | Signal<PostPaymentRecordsIdReportRefundBody>,
  ) => ReturnType<typeof httpResource<PostPaymentRecordsIdReportRefundResponse>>
>('POST_PAYMENT_RECORDS_ID_REPORT_REFUND', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body:
        | PostPaymentRecordsIdReportRefundBody
        | Signal<PostPaymentRecordsIdReportRefundBody>,
    ) =>
      httpResource<PostPaymentRecordsIdReportRefundResponse>(() => ({
        url: `${base}/v1/payment_records/${id}/report_refund`,
        method: 'POST',
        body,
      }));
  },
});
