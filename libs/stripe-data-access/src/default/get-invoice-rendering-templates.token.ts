import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetInvoiceRenderingTemplatesParams =
  paths['/v1/invoice_rendering_templates']['get']['parameters']['query'];

type GetInvoiceRenderingTemplatesResponse =
  paths['/v1/invoice_rendering_templates']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICE_RENDERING_TEMPLATES = new InjectionToken<
  (
    params?: GetInvoiceRenderingTemplatesParams,
  ) => ReturnType<typeof httpResource<GetInvoiceRenderingTemplatesResponse>>
>('GET_INVOICE_RENDERING_TEMPLATES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetInvoiceRenderingTemplatesParams) =>
      httpResource<GetInvoiceRenderingTemplatesResponse>(() => ({
        url: `${base}/v1/invoice_rendering_templates`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
