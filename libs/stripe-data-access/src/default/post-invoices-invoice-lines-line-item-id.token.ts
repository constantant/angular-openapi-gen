import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostInvoicesInvoiceLinesLineItemIdBody = NonNullable<
  paths['/v1/invoices/{invoice}/lines/{line_item_id}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostInvoicesInvoiceLinesLineItemIdResponse =
  paths['/v1/invoices/{invoice}/lines/{line_item_id}']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_LINES_LINE_ITEM_ID = new InjectionToken<
  (
    invoice: string,
    line_item_id: string,
    body:
      | PostInvoicesInvoiceLinesLineItemIdBody
      | Signal<PostInvoicesInvoiceLinesLineItemIdBody>,
  ) => ReturnType<
    typeof httpResource<PostInvoicesInvoiceLinesLineItemIdResponse>
  >
>('POST_INVOICES_INVOICE_LINES_LINE_ITEM_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      line_item_id: string,
      body:
        | PostInvoicesInvoiceLinesLineItemIdBody
        | Signal<PostInvoicesInvoiceLinesLineItemIdBody>,
    ) =>
      httpResource<PostInvoicesInvoiceLinesLineItemIdResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/lines/${line_item_id}`,
        method: 'POST',
        body,
      }));
  },
});
