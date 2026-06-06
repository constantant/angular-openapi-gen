import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostInvoicesCreatePreviewBody = NonNullable<
  paths['/v1/invoices/create_preview']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostInvoicesCreatePreviewResponse =
  paths['/v1/invoices/create_preview']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICES_CREATE_PREVIEW = new InjectionToken<
  (
    body: PostInvoicesCreatePreviewBody | Signal<PostInvoicesCreatePreviewBody>,
  ) => ReturnType<typeof httpResource<PostInvoicesCreatePreviewResponse>>
>('POST_INVOICES_CREATE_PREVIEW', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostInvoicesCreatePreviewBody
        | Signal<PostInvoicesCreatePreviewBody>,
    ) =>
      httpResource<PostInvoicesCreatePreviewResponse>(() => ({
        url: `${base}/v1/invoices/create_preview`,
        method: 'POST',
        body,
      }));
  },
});
