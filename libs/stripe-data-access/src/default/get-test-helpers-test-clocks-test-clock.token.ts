import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetTestHelpersTestClocksTestClockParams =
  paths['/v1/test_helpers/test_clocks/{test_clock}']['get']['parameters']['query'];

export type GetTestHelpersTestClocksTestClockResponse =
  paths['/v1/test_helpers/test_clocks/{test_clock}']['get']['responses']['200']['content']['application/json'];

export const GET_TEST_HELPERS_TEST_CLOCKS_TEST_CLOCK = new InjectionToken<
  (
    testClock: string,
    params?:
      | GetTestHelpersTestClocksTestClockParams
      | (() => GetTestHelpersTestClocksTestClockParams | undefined),
  ) => ReturnType<
    typeof httpResource<GetTestHelpersTestClocksTestClockResponse>
  >
>('GET_TEST_HELPERS_TEST_CLOCKS_TEST_CLOCK');

export function provideGetTestHelpersTestClocksTestClock(): FactoryProvider {
  return {
    provide: GET_TEST_HELPERS_TEST_CLOCKS_TEST_CLOCK,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        testClock: string,
        params?:
          | GetTestHelpersTestClocksTestClockParams
          | (() => GetTestHelpersTestClocksTestClockParams | undefined),
      ) =>
        httpResource<GetTestHelpersTestClocksTestClockResponse>(() => ({
          url: `${base}/v1/test_helpers/test_clocks/${testClock}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
