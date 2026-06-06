import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTreasuryCreditReversalsBody = NonNullable<
  paths['/v1/treasury/credit_reversals']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTreasuryCreditReversalsResponse =
  paths['/v1/treasury/credit_reversals']['post']['responses']['200']['content']['application/json'];

export const POST_TREASURY_CREDIT_REVERSALS = new InjectionToken<
  (
    body:
      | PostTreasuryCreditReversalsBody
      | Signal<PostTreasuryCreditReversalsBody>,
  ) => ReturnType<typeof httpResource<PostTreasuryCreditReversalsResponse>>
>('POST_TREASURY_CREDIT_REVERSALS');

export function providePostTreasuryCreditReversals(): FactoryProvider {
  return {
    provide: POST_TREASURY_CREDIT_REVERSALS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostTreasuryCreditReversalsBody
          | Signal<PostTreasuryCreditReversalsBody>,
      ) =>
        httpResource<PostTreasuryCreditReversalsResponse>(() => ({
          url: `${base}/v1/treasury/credit_reversals`,
          method: 'POST',
          body,
        }));
    },
  };
}
