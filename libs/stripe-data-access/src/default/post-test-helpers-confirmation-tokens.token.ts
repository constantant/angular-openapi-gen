import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersConfirmationTokensBody = NonNullable<
  paths['/v1/test_helpers/confirmation_tokens']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersConfirmationTokensResponse =
  paths['/v1/test_helpers/confirmation_tokens']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_CONFIRMATION_TOKENS = new InjectionToken<
  (
    body:
      | PostTestHelpersConfirmationTokensBody
      | Signal<PostTestHelpersConfirmationTokensBody>,
  ) => ReturnType<
    typeof httpResource<PostTestHelpersConfirmationTokensResponse>
  >
>('POST_TEST_HELPERS_CONFIRMATION_TOKENS');

export function providePostTestHelpersConfirmationTokens(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_CONFIRMATION_TOKENS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostTestHelpersConfirmationTokensBody
          | Signal<PostTestHelpersConfirmationTokensBody>,
      ) =>
        httpResource<PostTestHelpersConfirmationTokensResponse>(() => ({
          url: `${base}/v1/test_helpers/confirmation_tokens`,
          method: 'POST',
          body,
        }));
    },
  };
}
