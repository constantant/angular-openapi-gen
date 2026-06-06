import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetIssuingSettlementsSettlementParams =
  paths['/v1/issuing/settlements/{settlement}']['get']['parameters']['query'];

export type GetIssuingSettlementsSettlementResponse =
  paths['/v1/issuing/settlements/{settlement}']['get']['responses']['200']['content']['application/json'];

export const GET_ISSUING_SETTLEMENTS_SETTLEMENT = new InjectionToken<
  (
    settlement: string,
    params?:
      | GetIssuingSettlementsSettlementParams
      | (() => GetIssuingSettlementsSettlementParams | undefined),
  ) => ReturnType<typeof httpResource<GetIssuingSettlementsSettlementResponse>>
>('GET_ISSUING_SETTLEMENTS_SETTLEMENT');

export function provideGetIssuingSettlementsSettlement(): FactoryProvider {
  return {
    provide: GET_ISSUING_SETTLEMENTS_SETTLEMENT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        settlement: string,
        params?:
          | GetIssuingSettlementsSettlementParams
          | (() => GetIssuingSettlementsSettlementParams | undefined),
      ) =>
        httpResource<GetIssuingSettlementsSettlementResponse>(() => ({
          url: `${base}/v1/issuing/settlements/${settlement}`,
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
