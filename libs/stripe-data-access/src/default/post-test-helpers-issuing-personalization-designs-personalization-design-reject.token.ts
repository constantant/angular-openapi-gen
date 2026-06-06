import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectBody =
  NonNullable<
    paths['/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectResponse =
  paths['/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN_REJECT =
  new InjectionToken<
    (
      personalizationDesign: string,
      body:
        | PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectBody
        | Signal<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectResponse>
    >
  >(
    'POST_TEST_HELPERS_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN_REJECT',
    {
      providedIn: 'root',
      factory: () => {
        const base = inject(STRIPE_BASE_URL);
        return (
          personalizationDesign: string,
          body:
            | PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectBody
            | Signal<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectBody>,
        ) =>
          httpResource<PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignRejectResponse>(
            () => ({
              url: `${base}/v1/test_helpers/issuing/personalization_designs/${personalizationDesign}/reject`,
              method: 'POST',
              body,
            }),
          );
      },
    },
  );
