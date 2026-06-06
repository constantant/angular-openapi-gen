import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostIssuingSettlementsSettlementBody = NonNullable<
  paths['/v1/issuing/settlements/{settlement}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostIssuingSettlementsSettlementResponse =
  paths['/v1/issuing/settlements/{settlement}']['post']['responses']['200']['content']['application/json'];

export const POST_ISSUING_SETTLEMENTS_SETTLEMENT = new InjectionToken<
  (
    settlement: string,
    body:
      | PostIssuingSettlementsSettlementBody
      | Signal<PostIssuingSettlementsSettlementBody>,
  ) => ReturnType<typeof httpResource<PostIssuingSettlementsSettlementResponse>>
>('POST_ISSUING_SETTLEMENTS_SETTLEMENT');

export function providePostIssuingSettlementsSettlement(): FactoryProvider {
  return {
    provide: POST_ISSUING_SETTLEMENTS_SETTLEMENT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        settlement: string,
        body:
          | PostIssuingSettlementsSettlementBody
          | Signal<PostIssuingSettlementsSettlementBody>,
      ) =>
        httpResource<PostIssuingSettlementsSettlementResponse>(() => ({
          url: `${base}/v1/issuing/settlements/${settlement}`,
          method: 'POST',
          body,
        }));
    },
  };
}
