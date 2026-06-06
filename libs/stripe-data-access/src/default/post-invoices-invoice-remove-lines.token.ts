import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostInvoicesInvoiceRemoveLinesBody = NonNullable<
  paths['/v1/invoices/{invoice}/remove_lines']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostInvoicesInvoiceRemoveLinesResponse =
  paths['/v1/invoices/{invoice}/remove_lines']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_INVOICE_REMOVE_LINES = new InjectionToken<
  (
    invoice: string,
    body:
      | PostInvoicesInvoiceRemoveLinesBody
      | Signal<PostInvoicesInvoiceRemoveLinesBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesInvoiceRemoveLinesResponse>>
>('POST_INVOICES_INVOICE_REMOVE_LINES');

export function providePostInvoicesInvoiceRemoveLines(): FactoryProvider {
  return {
    provide: POST_INVOICES_INVOICE_REMOVE_LINES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        invoice: string,
        body:
          | PostInvoicesInvoiceRemoveLinesBody
          | Signal<PostInvoicesInvoiceRemoveLinesBody>,
      ) =>
        httpResource<PostInvoicesInvoiceRemoveLinesResponse>(() => ({
          url: `${base}/v1/invoices/${invoice}/remove_lines`,
          method: 'POST',
          body,
        }));
    },
  };
}
