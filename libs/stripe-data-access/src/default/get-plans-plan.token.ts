import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetPlansPlanParams =
  paths['/v1/plans/{plan}']['get']['parameters']['query'];

type GetPlansPlanResponse =
  paths['/v1/plans/{plan}']['get']['responses']['200']['content']['application/json'];

export const GET_PLANS_PLAN = new InjectionToken<
  (
    plan: string,
    params?: GetPlansPlanParams,
  ) => ReturnType<typeof httpResource<GetPlansPlanResponse>>
>('GET_PLANS_PLAN', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (plan: string, params?: GetPlansPlanParams) =>
      httpResource<GetPlansPlanResponse>(() => ({
        url: `${base}/v1/plans/${plan}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
