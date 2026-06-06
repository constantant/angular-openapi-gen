import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotEnterpriseOneDayUsageMetricsParams =
  paths['/enterprises/{enterprise}/copilot/metrics/reports/enterprise-1-day']['get']['parameters']['query'];

export type CopilotCopilotEnterpriseOneDayUsageMetricsResponse =
  paths['/enterprises/{enterprise}/copilot/metrics/reports/enterprise-1-day']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_ENTERPRISE_ONE_DAY_USAGE_METRICS =
  new InjectionToken<
    (
      enterprise: string,
      params?:
        | CopilotCopilotEnterpriseOneDayUsageMetricsParams
        | (() => CopilotCopilotEnterpriseOneDayUsageMetricsParams | undefined),
    ) => ReturnType<
      typeof httpResource<CopilotCopilotEnterpriseOneDayUsageMetricsResponse>
    >
  >('COPILOT_COPILOT_ENTERPRISE_ONE_DAY_USAGE_METRICS');

export function provideCopilotCopilotEnterpriseOneDayUsageMetrics(): FactoryProvider {
  return {
    provide: COPILOT_COPILOT_ENTERPRISE_ONE_DAY_USAGE_METRICS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        params?:
          | CopilotCopilotEnterpriseOneDayUsageMetricsParams
          | (() =>
              | CopilotCopilotEnterpriseOneDayUsageMetricsParams
              | undefined),
      ) =>
        httpResource<CopilotCopilotEnterpriseOneDayUsageMetricsResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/copilot/metrics/reports/enterprise-1-day`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  };
}
