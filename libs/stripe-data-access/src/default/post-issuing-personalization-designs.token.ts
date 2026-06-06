import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingPersonalizationDesignsBody = NonNullable<
  paths['/v1/issuing/personalization_designs']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingPersonalizationDesignsResponse =
  paths['/v1/issuing/personalization_designs']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_PERSONALIZATION_DESIGNS = new InjectionToken<
  (
    body:
      | PostIssuingPersonalizationDesignsBody
      | Signal<PostIssuingPersonalizationDesignsBody>,
  ) => ReturnType<
    typeof httpResource<PostIssuingPersonalizationDesignsResponse>
  >
>('POST_ISSUING_PERSONALIZATION_DESIGNS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostIssuingPersonalizationDesignsBody
        | Signal<PostIssuingPersonalizationDesignsBody>,
    ) =>
      httpResource<PostIssuingPersonalizationDesignsResponse>(() => ({
        url: `${base}/v1/issuing/personalization_designs`,
        method: 'POST',
        body,
      }));
  },
});
