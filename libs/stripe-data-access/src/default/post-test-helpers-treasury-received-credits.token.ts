import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTreasuryReceivedCreditsBody = NonNullable<
  paths['/v1/test_helpers/treasury/received_credits']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTreasuryReceivedCreditsResponse =
  paths['/v1/test_helpers/treasury/received_credits']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_RECEIVED_CREDITS = new InjectionToken<
  (
    body:
      | PostTestHelpersTreasuryReceivedCreditsBody
      | Signal<PostTestHelpersTreasuryReceivedCreditsBody>,
  ) => ReturnType<
    typeof httpResource<PostTestHelpersTreasuryReceivedCreditsResponse>
  >
>('POST_TEST_HELPERS_TREASURY_RECEIVED_CREDITS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTestHelpersTreasuryReceivedCreditsBody
        | Signal<PostTestHelpersTreasuryReceivedCreditsBody>,
    ) =>
      httpResource<PostTestHelpersTreasuryReceivedCreditsResponse>(() => ({
        url: `${base}/v1/test_helpers/treasury/received_credits`,
        method: 'POST',
        body,
      }));
  },
});
