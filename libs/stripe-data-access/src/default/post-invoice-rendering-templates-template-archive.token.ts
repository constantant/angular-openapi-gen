import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostInvoiceRenderingTemplatesTemplateArchiveBody = NonNullable<
  paths['/v1/invoice_rendering_templates/{template}/archive']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostInvoiceRenderingTemplatesTemplateArchiveResponse =
  paths['/v1/invoice_rendering_templates/{template}/archive']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICE_RENDERING_TEMPLATES_TEMPLATE_ARCHIVE =
  new InjectionToken<
    (
      template: string,
      body:
        | PostInvoiceRenderingTemplatesTemplateArchiveBody
        | Signal<PostInvoiceRenderingTemplatesTemplateArchiveBody>,
    ) => ReturnType<
      typeof httpResource<PostInvoiceRenderingTemplatesTemplateArchiveResponse>
    >
  >('POST_INVOICE_RENDERING_TEMPLATES_TEMPLATE_ARCHIVE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        template: string,
        body:
          | PostInvoiceRenderingTemplatesTemplateArchiveBody
          | Signal<PostInvoiceRenderingTemplatesTemplateArchiveBody>,
      ) =>
        httpResource<PostInvoiceRenderingTemplatesTemplateArchiveResponse>(
          () => ({
            url: `${base}/v1/invoice_rendering_templates/${template}/archive`,
            method: 'POST',
            body,
          }),
        );
    },
  });
