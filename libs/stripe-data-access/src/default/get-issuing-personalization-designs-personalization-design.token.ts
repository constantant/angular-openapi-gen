import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingPersonalizationDesignsPersonalizationDesignParams =
  paths['/v1/issuing/personalization_designs/{personalization_design}']['get']['parameters']['query'];

export type GetIssuingPersonalizationDesignsPersonalizationDesignResponse =
  paths['/v1/issuing/personalization_designs/{personalization_design}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN =
  new InjectionToken<
    (
      personalizationDesign: string,
      params?:
        | GetIssuingPersonalizationDesignsPersonalizationDesignParams
        | (() =>
            | GetIssuingPersonalizationDesignsPersonalizationDesignParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<GetIssuingPersonalizationDesignsPersonalizationDesignResponse>
    >
  >('GET_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN');

export function provideGetIssuingPersonalizationDesignsPersonalizationDesign(): FactoryProvider {
  return {
    provide: GET_ISSUING_PERSONALIZATION_DESIGNS_PERSONALIZATION_DESIGN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        personalizationDesign: string,
        params?:
          | GetIssuingPersonalizationDesignsPersonalizationDesignParams
          | (() =>
              | GetIssuingPersonalizationDesignsPersonalizationDesignParams
              | undefined),
      ) =>
        httpResource<GetIssuingPersonalizationDesignsPersonalizationDesignResponse>(
          () => ({
            url: `${base}/v1/issuing/personalization_designs/${personalizationDesign}`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
