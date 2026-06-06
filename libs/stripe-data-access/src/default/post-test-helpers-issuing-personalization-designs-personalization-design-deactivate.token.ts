import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateBody =
  NonNullable<
    paths['/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateResponse =
  paths['/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN_DEACTIVATE =
  new InjectionToken<
    (
      personalizationDesign: string,
      body:
        | PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateBody
        | Signal<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateResponse>
    >
  >(
    'POST_TEST_HELPERS_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN_DEACTIVATE',
    {
      providedIn: 'root',
      factory: () => {
        const base = inject(STRIPE_BASE_URL);
        return (
          personalizationDesign: string,
          body:
            | PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateBody
            | Signal<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateBody>,
        ) =>
          httpResource<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivateResponse>(
            () => ({
              url: `${base}/v1/test_helpers/issuing/personalization_designs/${personalizationDesign}/deactivate`,
              method: 'POST',
              body,
            }),
          );
      },
    },
  );
