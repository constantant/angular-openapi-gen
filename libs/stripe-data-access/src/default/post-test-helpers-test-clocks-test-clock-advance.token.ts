import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTestHelpersTestClocksTestClockAdvanceBody = NonNullable<
  paths['/v1/test_helpers/test_clocks/{test_clock}/advance']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTestHelpersTestClocksTestClockAdvanceResponse =
  paths['/v1/test_helpers/test_clocks/{test_clock}/advance']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TEST_CLOCKS_TEST_CLOCK_ADVANCE =
  new InjectionToken<
    (
      test_clock: string,
      body:
        | PostTestHelpersTestClocksTestClockAdvanceBody
        | Signal<PostTestHelpersTestClocksTestClockAdvanceBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTestClocksTestClockAdvanceResponse>
    >
  >('POST_TEST_HELPERS_TEST_CLOCKS_TEST_CLOCK_ADVANCE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        test_clock: string,
        body:
          | PostTestHelpersTestClocksTestClockAdvanceBody
          | Signal<PostTestHelpersTestClocksTestClockAdvanceBody>,
      ) =>
        httpResource<PostTestHelpersTestClocksTestClockAdvanceResponse>(() => ({
          url: `${base}/v1/test_helpers/test_clocks/${test_clock}/advance`,
          method: 'POST',
          body,
        }));
    },
  });
