import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotUsersOneDayUsageMetricsParams =
  paths['/enterprises/{enterprise}/copilot/metrics/reports/users-1-day']['get']['parameters']['query'];

export type CopilotCopilotUsersOneDayUsageMetricsResponse =
  paths['/enterprises/{enterprise}/copilot/metrics/reports/users-1-day']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_USERS_ONE_DAY_USAGE_METRICS = new InjectionToken<
  (
    enterprise: string,
    params?:
      | CopilotCopilotUsersOneDayUsageMetricsParams
      | (() => CopilotCopilotUsersOneDayUsageMetricsParams | undefined),
  ) => ReturnType<
    typeof httpResource<CopilotCopilotUsersOneDayUsageMetricsResponse>
  >
>('COPILOT_COPILOT_USERS_ONE_DAY_USAGE_METRICS');

export function provideCopilotCopilotUsersOneDayUsageMetrics(): FactoryProvider {
  return {
    provide: COPILOT_COPILOT_USERS_ONE_DAY_USAGE_METRICS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        params?:
          | CopilotCopilotUsersOneDayUsageMetricsParams
          | (() => CopilotCopilotUsersOneDayUsageMetricsParams | undefined),
      ) =>
        httpResource<CopilotCopilotUsersOneDayUsageMetricsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/enterprises/${enterprise}/copilot/metrics/reports/users-1-day`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
