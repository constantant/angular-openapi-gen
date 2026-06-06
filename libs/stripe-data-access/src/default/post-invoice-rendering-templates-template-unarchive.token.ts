import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostInvoiceRenderingTemplatesTemplateUnarchiveBody = NonNullable<
  paths['/v1/invoice_rendering_templates/{template}/unarchive']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostInvoiceRenderingTemplatesTemplateUnarchiveResponse =
  paths['/v1/invoice_rendering_templates/{template}/unarchive']['post']['responses']['200']['content']['application/json'];

export const POST_INVOICE_RENDERING_TEMPLATES_TEMPLATE_UNARCHIVE =
  new InjectionToken<
    (
      template: string,
      body:
        | PostInvoiceRenderingTemplatesTemplateUnarchiveBody
        | Signal<PostInvoiceRenderingTemplatesTemplateUnarchiveBody>,
    ) => ReturnType<
      typeof httpResource<PostInvoiceRenderingTemplatesTemplateUnarchiveResponse>
    >
  >('POST_INVOICE_RENDERING_TEMPLATES_TEMPLATE_UNARCHIVE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        template: string,
        body:
          | PostInvoiceRenderingTemplatesTemplateUnarchiveBody
          | Signal<PostInvoiceRenderingTemplatesTemplateUnarchiveBody>,
      ) =>
        httpResource<PostInvoiceRenderingTemplatesTemplateUnarchiveResponse>(
          () => ({
            url: `${base}/v1/invoice_rendering_templates/${template}/unarchive`,
            method: 'POST',
            body,
          }),
        );
    },
  });
