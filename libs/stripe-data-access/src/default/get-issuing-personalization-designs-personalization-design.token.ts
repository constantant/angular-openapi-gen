import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetIssuingPersonalizationDesignsPersonalizationDesignParams =
  paths['/v1/issuing/personalization_designs/{personalization_design}']['get']['parameters']['query'];

type GetIssuingPersonalizationDesignsPersonalizationDesignResponse =
  paths['/v1/issuing/personalization_designs/{personalization_design}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN =
  new InjectionToken<
    (
      personalization_design: string,
      params?: GetIssuingPersonalizationDesignsPersonalizationDesignParams,
    ) => ReturnType<
      typeof httpResource<GetIssuingPersonalizationDesignsPersonalizationDesignResponse>
    >
  >('GET_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        personalization_design: string,
        params?: GetIssuingPersonalizationDesignsPersonalizationDesignParams,
      ) =>
        httpResource<GetIssuingPersonalizationDesignsPersonalizationDesignResponse>(
          () => ({
            url: `${base}/v1/issuing/personalization_designs/${personalization_design}`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
