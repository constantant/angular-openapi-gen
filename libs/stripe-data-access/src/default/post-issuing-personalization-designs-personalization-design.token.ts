import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingPersonalizationDesignsPersonalizationDesignBody =
  NonNullable<
    paths['/v1/issuing/personalization_designs/{personalization_design}']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostIssuingPersonalizationDesignsPersonalizationDesignResponse =
  paths['/v1/issuing/personalization_designs/{personalization_design}']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN =
  new InjectionToken<
    (
      personalizationDesign: string,
      body:
        | PostIssuingPersonalizationDesignsPersonalizationDesignBody
        | Signal<PostIssuingPersonalizationDesignsPersonalizationDesignBody>,
    ) => ReturnType<
      typeof httpResource<PostIssuingPersonalizationDesignsPersonalizationDesignResponse>
    >
  >('POST_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN');

export function providePostIssuingPersonalizationDesignsPersonalizationDesign(): FactoryProvider {
  return {
    provide: POST_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        personalizationDesign: string,
        body:
          | PostIssuingPersonalizationDesignsPersonalizationDesignBody
          | Signal<PostIssuingPersonalizationDesignsPersonalizationDesignBody>,
      ) =>
        httpResource<PostIssuingPersonalizationDesignsPersonalizationDesignResponse>(
          () => ({
            url: `${base}/v1/issuing/personalization_designs/${personalizationDesign}`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
