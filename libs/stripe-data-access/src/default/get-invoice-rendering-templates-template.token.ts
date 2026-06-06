import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetInvoiceRenderingTemplatesTemplateParams =
  paths['/v1/invoice_rendering_templates/{template}']['get']['parameters']['query'];

export type GetInvoiceRenderingTemplatesTemplateResponse =
  paths['/v1/invoice_rendering_templates/{template}']['get']['responses']['200']['content']['application/json'];

export const GET_INVOICE_RENDERING_TEMPLATES_TEMPLATE = new InjectionToken<
  (
    template: string,
    params?:
      | GetInvoiceRenderingTemplatesTemplateParams
      | (() => GetInvoiceRenderingTemplatesTemplateParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetInvoiceRenderingTemplatesTemplateResponse>
  >
>('GET_INVOICE_RENDERING_TEMPLATES_TEMPLATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      template: string,
      params?:
        | GetInvoiceRenderingTemplatesTemplateParams
        | (() => GetInvoiceRenderingTemplatesTemplateParams | undefined),
    ) =>
      httpResource<GetInvoiceRenderingTemplatesTemplateResponse>(() => ({
        url: `${base}/v1/invoice_rendering_templates/${template}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
