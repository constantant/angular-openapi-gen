import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingSettlementsSettlementCompleteBody =
  NonNullable<
    paths['/v1/test_helpers/issuing/settlements/{settlement}/complete']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingSettlementsSettlementCompleteResponse =
  paths['/v1/test_helpers/issuing/settlements/{settlement}/complete']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_SETTLEMENTS_SETTLEMENT_COMPLETE =
  new InjectionToken<
    (
      settlement: string,
      body:
        | PostTestHelpersIssuingSettlementsSettlementCompleteBody
        | Signal<PostTestHelpersIssuingSettlementsSettlementCompleteBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingSettlementsSettlementCompleteResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_SETTLEMENTS_SETTLEMENT_COMPLETE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        settlement: string,
        body:
          | PostTestHelpersIssuingSettlementsSettlementCompleteBody
          | Signal<PostTestHelpersIssuingSettlementsSettlementCompleteBody>,
      ) =>
        httpResource<PostTestHelpersIssuingSettlementsSettlementCompleteResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/settlements/${settlement}/complete`,
            method: 'POST',
            body,
          }),
        );
    },
  });
