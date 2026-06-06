import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersConfirmationTokensBody = NonNullable<
  paths['/v1/test_helpers/confirmation_tokens']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersConfirmationTokensResponse =
  paths['/v1/test_helpers/confirmation_tokens']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_CONFIRMATION_TOKENS = new InjectionToken<
  (
    body:
      | PostTestHelpersConfirmationTokensBody
      | Signal<PostTestHelpersConfirmationTokensBody>,
  ) => ReturnType<
    typeof httpResource<PostTestHelpersConfirmationTokensResponse>
  >
>('POST_TEST_HELPERS_CONFIRMATION_TOKENS', {
  providedIn: 'root',
  factory: () => {
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
});
