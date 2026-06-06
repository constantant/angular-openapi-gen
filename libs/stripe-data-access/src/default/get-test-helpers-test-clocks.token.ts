import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetTestHelpersTestClocksParams =
  paths['/v1/test_helpers/test_clocks']['get']['parameters']['query'];

type GetTestHelpersTestClocksResponse =
  paths['/v1/test_helpers/test_clocks']['get']['responses']['200']['content']['application/json'];

export const GET_TEST_HELPERS_TEST_CLOCKS = new InjectionToken<
  (
    params?: GetTestHelpersTestClocksParams,
  ) => ReturnType<typeof httpResource<GetTestHelpersTestClocksResponse>>
>('GET_TEST_HELPERS_TEST_CLOCKS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetTestHelpersTestClocksParams) =>
      httpResource<GetTestHelpersTestClocksResponse>(() => ({
        url: `${base}/v1/test_helpers/test_clocks`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
