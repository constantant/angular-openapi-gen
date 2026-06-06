import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostPlansPlanBody = NonNullable<
  paths['/v1/plans/{plan}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostPlansPlanResponse =
  paths['/v1/plans/{plan}']['post']['responses']['200']['content']['application/json'];

export const POST_PLANS_PLAN = new InjectionToken<
  (
    plan: string,
    body: PostPlansPlanBody | Signal<PostPlansPlanBody>,
  ) => ReturnType<typeof httpResource<PostPlansPlanResponse>>
>('POST_PLANS_PLAN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      plan: string,
      body: PostPlansPlanBody | Signal<PostPlansPlanBody>,
    ) =>
      httpResource<PostPlansPlanResponse>(() => ({
        url: `${base}/v1/plans/${plan}`,
        method: 'POST',
        body,
      }));
  },
});
