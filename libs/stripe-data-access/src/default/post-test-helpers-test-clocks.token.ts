import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTestClocksBody = NonNullable<
  paths['/v1/test_helpers/test_clocks']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTestClocksResponse =
  paths['/v1/test_helpers/test_clocks']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TEST_CLOCKS = new InjectionToken<
  (
    body: PostTestHelpersTestClocksBody | Signal<PostTestHelpersTestClocksBody>,
  ) => ReturnType<typeof httpResource<PostTestHelpersTestClocksResponse>>
>('POST_TEST_HELPERS_TEST_CLOCKS');

export function providePostTestHelpersTestClocks(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_TEST_CLOCKS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostTestHelpersTestClocksBody
          | Signal<PostTestHelpersTestClocksBody>,
      ) =>
        httpResource<PostTestHelpersTestClocksResponse>(() => ({
          url: `${base}/v1/test_helpers/test_clocks`,
          method: 'POST',
          body,
        }));
    },
  };
}
