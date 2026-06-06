import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPlansBody = NonNullable<
  paths['/v1/plans']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPlansResponse =
  paths['/v1/plans']['post']['responses']['200']['content']['application/json'];

export const POST_PLANS = new InjectionToken<
  (
    body: PostPlansBody | Signal<PostPlansBody>,
  ) => ReturnType<typeof httpResource<PostPlansResponse>>
>('POST_PLANS');

export function providePostPlans(): FactoryProvider {
  return {
    provide: POST_PLANS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostPlansBody | Signal<PostPlansBody>) =>
        httpResource<PostPlansResponse>(() => ({
          url: `${base}/v1/plans`,
          method: 'POST',
          body,
        }));
    },
  };
}
