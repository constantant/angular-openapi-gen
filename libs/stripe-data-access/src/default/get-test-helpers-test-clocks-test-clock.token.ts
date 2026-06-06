import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTestHelpersTestClocksTestClockParams =
  paths['/v1/test_helpers/test_clocks/{test_clock}']['get']['parameters']['query'];

type GetTestHelpersTestClocksTestClockResponse =
  paths['/v1/test_helpers/test_clocks/{test_clock}']['get']['responses']['200']['content']['application/json'];

export const GET_TEST_HELPERS_TEST_CLOCKS_TEST_CLOCK = new InjectionToken<
  (
    test_clock: string,
    params?: GetTestHelpersTestClocksTestClockParams,
  ) => ReturnType<
    typeof httpResource<GetTestHelpersTestClocksTestClockResponse>
  >
>('GET_TEST_HELPERS_TEST_CLOCKS_TEST_CLOCK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      test_clock: string,
      params?: GetTestHelpersTestClocksTestClockParams,
    ) =>
      httpResource<GetTestHelpersTestClocksTestClockResponse>(() => ({
        url: `${base}/v1/test_helpers/test_clocks/${test_clock}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
