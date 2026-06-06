import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingPersonalizationDesignsParams =
  paths['/v1/issuing/personalization_designs']['get']['parameters']['query'];

export type GetIssuingPersonalizationDesignsResponse =
  paths['/v1/issuing/personalization_designs']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_PERSONALIZATION_DESIGNS = new InjectionToken<
  (
    params?:
      | GetIssuingPersonalizationDesignsParams
      | (() => GetIssuingPersonalizationDesignsParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingPersonalizationDesignsResponse>>
>('GET_ISSUING_PERSONALIZATION_DESIGNS');

export function provideGetIssuingPersonalizationDesigns(): FactoryProvider {
  return {
    provide: GET_ISSUING_PERSONALIZATION_DESIGNS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetIssuingPersonalizationDesignsParams
          | (() => GetIssuingPersonalizationDesignsParams | undefined),
      ) =>
        httpResource<GetIssuingPersonalizationDesignsResponse>(() => ({
          url: `${base}/v1/issuing/personalization_designs`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
