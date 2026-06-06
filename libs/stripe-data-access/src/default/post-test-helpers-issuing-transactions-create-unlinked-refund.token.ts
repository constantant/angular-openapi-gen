import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersIssuingTransactionsCreateUnlinkedRefundBody = NonNullable<
  paths['/v1/test_helpers/issuing/transactions/create_unlinked_refund']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersIssuingTransactionsCreateUnlinkedRefundResponse =
  paths['/v1/test_helpers/issuing/transactions/create_unlinked_refund']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_TRANSACTIONS_CREATE_UNLINKED_REFUND =
  new InjectionToken<
    (
      body:
        | PostTestHelpersIssuingTransactionsCreateUnlinkedRefundBody
        | Signal<PostTestHelpersIssuingTransactionsCreateUnlinkedRefundBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersIssuingTransactionsCreateUnlinkedRefundResponse>
    >
  >('POST_TEST_HELPERS_ISSUING_TRANSACTIONS_CREATE_UNLINKED_REFUND', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostTestHelpersIssuingTransactionsCreateUnlinkedRefundBody
          | Signal<PostTestHelpersIssuingTransactionsCreateUnlinkedRefundBody>,
      ) =>
        httpResource<PostTestHelpersIssuingTransactionsCreateUnlinkedRefundResponse>(
          () => ({
            url: `${base}/v1/test_helpers/issuing/transactions/create_unlinked_refund`,
            method: 'POST',
            body,
          }),
        );
    },
  });
