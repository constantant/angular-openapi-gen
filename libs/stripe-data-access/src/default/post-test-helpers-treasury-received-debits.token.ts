import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTreasuryReceivedDebitsBody = NonNullable<
  paths['/v1/test_helpers/treasury/received_debits']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTreasuryReceivedDebitsResponse =
  paths['/v1/test_helpers/treasury/received_debits']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TREASURY_RECEIVED_DEBITS = new InjectionToken<
  (
    body:
      | PostTestHelpersTreasuryReceivedDebitsBody
      | Signal<PostTestHelpersTreasuryReceivedDebitsBody>,
  ) => ReturnType<
    typeof httpResource<PostTestHelpersTreasuryReceivedDebitsResponse>
  >
>('POST_TEST_HELPERS_TREASURY_RECEIVED_DEBITS');

export function providePostTestHelpersTreasuryReceivedDebits(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_TREASURY_RECEIVED_DEBITS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostTestHelpersTreasuryReceivedDebitsBody
          | Signal<PostTestHelpersTreasuryReceivedDebitsBody>,
      ) =>
        httpResource<PostTestHelpersTreasuryReceivedDebitsResponse>(() => ({
          url: `${base}/v1/test_helpers/treasury/received_debits`,
          method: 'POST',
          body,
        }));
    },
  };
}
