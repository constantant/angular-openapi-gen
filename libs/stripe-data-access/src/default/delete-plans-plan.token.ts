import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeletePlansPlanBody = NonNullable<
  paths['/v1/plans/{plan}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeletePlansPlanResponse =
  paths['/v1/plans/{plan}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_PLANS_PLAN = new InjectionToken<
  (
    plan: string,
    body: DeletePlansPlanBody | Signal<DeletePlansPlanBody>,
  ) => ReturnType<typeof httpResource<DeletePlansPlanResponse>>
>('DELETE_PLANS_PLAN');

export function provideDeletePlansPlan(): FactoryProvider {
  return {
    provide: DELETE_PLANS_PLAN,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        plan: string,
        body: DeletePlansPlanBody | Signal<DeletePlansPlanBody>,
      ) =>
        httpResource<DeletePlansPlanResponse>(() => ({
          url: `${base}/v1/plans/${plan}`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
