import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersIssuingSettlementsBody = NonNullable<
  paths['/v1/test_helpers/issuing/settlements']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersIssuingSettlementsResponse =
  paths['/v1/test_helpers/issuing/settlements']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_ISSUING_SETTLEMENTS = new InjectionToken<
  (
    body:
      | PostTestHelpersIssuingSettlementsBody
      | Signal<PostTestHelpersIssuingSettlementsBody>,
  ) => ReturnType<
    typeof httpResource<PostTestHelpersIssuingSettlementsResponse>
  >
>('POST_TEST_HELPERS_ISSUING_SETTLEMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      body:
        | PostTestHelpersIssuingSettlementsBody
        | Signal<PostTestHelpersIssuingSettlementsBody>,
    ) =>
      httpResource<PostTestHelpersIssuingSettlementsResponse>(() => ({
        url: `${base}/v1/test_helpers/issuing/settlements`,
        method: 'POST',
        body,
      }));
  },
});
