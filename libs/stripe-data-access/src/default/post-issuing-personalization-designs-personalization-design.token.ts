import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostIssuingPersonalizationDesignsPersonalizationDesignBody = NonNullable<
  paths['/v1/issuing/personalization_designs/{personalization_design}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostIssuingPersonalizationDesignsPersonalizationDesignResponse =
  paths['/v1/issuing/personalization_designs/{personalization_design}']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN =
  new InjectionToken<
    (
      personalization_design: string,
      body:
        | PostIssuingPersonalizationDesignsPersonalizationDesignBody
        | Signal<PostIssuingPersonalizationDesignsPersonalizationDesignBody>,
    ) => ReturnType<
      typeof httpResource<PostIssuingPersonalizationDesignsPersonalizationDesignResponse>
    >
  >('POST_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        personalization_design: string,
        body:
          | PostIssuingPersonalizationDesignsPersonalizationDesignBody
          | Signal<PostIssuingPersonalizationDesignsPersonalizationDesignBody>,
      ) =>
        httpResource<PostIssuingPersonalizationDesignsPersonalizationDesignResponse>(
          () => ({
            url: `${base}/v1/issuing/personalization_designs/${personalization_design}`,
            method: 'POST',
            body,
          }),
        );
    },
  });
