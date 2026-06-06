import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateBody =
  NonNullable<
    paths['/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateResponse =
  paths['/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN_ACTIVATE =
  new InjectionToken<
    (
      personalizationDesign: string,
      body:
        | PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateBody
        | Signal<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateResponse>
    >
  >(
    'POST_TEST_HELPERS_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN_ACTIVATE',
    {
      providedIn: 'root',
      factory: () => {
        const base = inject(STRIPE_BASE_URL);
        return (
          personalizationDesign: string,
          body:
            | PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateBody
            | Signal<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateBody>,
        ) =>
          httpResource<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivateResponse>(
            () => ({
              url: `${base}/v1/test_helpers/issuing/personalization_designs/${personalizationDesign}/activate`,
              method: 'POST',
              body,
            }),
          );
      },
    },
  );
