import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostInvoicesInvoiceMarkUncollectibleBody = NonNullable<
  paths['/v1/invoices/{invoice}/mark_uncollectible']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostInvoicesInvoiceMarkUncollectibleResponse =
  paths['/v1/invoices/{invoice}/mark_uncollectible']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_MARK_UNCOLLECTIBLE = new InjectionToken<
  (
    invoice: string,
    body:
      | PostInvoicesInvoiceMarkUncollectibleBody
      | Signal<PostInvoicesInvoiceMarkUncollectibleBody>,
  ) => ReturnType<
    typeof httpResource<PostInvoicesInvoiceMarkUncollectibleResponse>
  >
>('POST_INVOICES_INVOICE_MARK_UNCOLLECTIBLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      invoice: string,
      body:
        | PostInvoicesInvoiceMarkUncollectibleBody
        | Signal<PostInvoicesInvoiceMarkUncollectibleBody>,
    ) =>
      httpResource<PostInvoicesInvoiceMarkUncollectibleResponse>(() => ({
        url: `${base}/v1/invoices/${invoice}/mark_uncollectible`,
        method: 'POST',
        body,
      }));
  },
});
