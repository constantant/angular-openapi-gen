import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotOrganizationOneDayUsageMetricsParams =
  paths['/orgs/{org}/copilot/metrics/reports/organization-1-day']['get']['parameters']['query'];

export type CopilotCopilotOrganizationOneDayUsageMetricsResponse =
  paths['/orgs/{org}/copilot/metrics/reports/organization-1-day']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_ORGANIZATION_ONE_DAY_USAGE_METRICS =
  new InjectionToken<
    (
      org: string,
      params?:
        | CopilotCopilotOrganizationOneDayUsageMetricsParams
        | (() =>
            | CopilotCopilotOrganizationOneDayUsageMetricsParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<CopilotCopilotOrganizationOneDayUsageMetricsResponse>
    >
  >('COPILOT_COPILOT_ORGANIZATION_ONE_DAY_USAGE_METRICS');

export function provideCopilotCopilotOrganizationOneDayUsageMetrics(): FactoryProvider {
  return {
    provide: COPILOT_COPILOT_ORGANIZATION_ONE_DAY_USAGE_METRICS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | CopilotCopilotOrganizationOneDayUsageMetricsParams
          | (() =>
              | CopilotCopilotOrganizationOneDayUsageMetricsParams
              | undefined),
      ) =>
        httpResource<CopilotCopilotOrganizationOneDayUsageMetricsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/orgs/${org}/copilot/metrics/reports/organization-1-day`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
        );
    },
  };
}
