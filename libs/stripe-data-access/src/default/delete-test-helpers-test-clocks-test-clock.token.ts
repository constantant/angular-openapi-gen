import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteTestHelpersTestClocksTestClockBody = NonNullable<
  paths['/v1/test_helpers/test_clocks/{test_clock}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteTestHelpersTestClocksTestClockResponse =
  paths['/v1/test_helpers/test_clocks/{test_clock}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_TEST_HELPERS_TEST_CLOCKS_TEST_CLOCK = new InjectionToken<
  (
    test_clock: string,
    body:
      | DeleteTestHelpersTestClocksTestClockBody
      | Signal<DeleteTestHelpersTestClocksTestClockBody>,
  ) => ReturnType<
    typeof httpResource<DeleteTestHelpersTestClocksTestClockResponse>
  >
>('DELETE_TEST_HELPERS_TEST_CLOCKS_TEST_CLOCK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      test_clock: string,
      body:
        | DeleteTestHelpersTestClocksTestClockBody
        | Signal<DeleteTestHelpersTestClocksTestClockBody>,
    ) =>
      httpResource<DeleteTestHelpersTestClocksTestClockResponse>(() => ({
        url: `${base}/v1/test_helpers/test_clocks/${test_clock}`,
        method: 'DELETE',
        body,
      }));
  },
});
