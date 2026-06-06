import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingTransactionsCreateForceCaptureBody =
  NonNullable<
    paths['/v1/test_helpers/issuing/transactions/create_force_capture']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingTransactionsCreateForceCaptureResponse =
  paths['/v1/test_helpers/issuing/transactions/create_force_capture']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_TRANSACTIONS_CREATE_FORCE_CAPTURE =
  new InjectionToken<
    (
      body:
        | PostTestHelpersIssuingTransactionsCreateForceCaptureBody
        | Signal<PostTestHelpersIssuingTransactionsCreateForceCaptureBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingTransactionsCreateForceCaptureResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_TRANSACTIONS_CREATE_FORCE_CAPTURE');

export function providePostTestHelpersIssuingTransactionsCreateForceCapture(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_ISSUING_TRANSACTIONS_CREATE_FORCE_CAPTURE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostTestHelpersIssuingTransactionsCreateForceCaptureBody
          | Signal<PostTestHelpersIssuingTransactionsCreateForceCaptureBody>,
      ) =>
        httpResource<PostTestHelpersIssuingTransactionsCreateForceCaptureResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/transactions/create_force_capture`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
