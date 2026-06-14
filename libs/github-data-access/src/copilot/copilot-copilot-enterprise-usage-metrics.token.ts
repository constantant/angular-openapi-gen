import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotEnterpriseUsageMetricsResponse =
  paths['/enterprises/{enterprise}/copilot/metrics/reports/enterprise-28-day/latest']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_ENTERPRISE_USAGE_METRICS = new InjectionToken<
  (
    enterprise: string,
  ) => ReturnType<
    typeof httpResource<CopilotCopilotEnterpriseUsageMetricsResponse>
  >
>('COPILOT_COPILOT_ENTERPRISE_USAGE_METRICS');

export function provideCopilotCopilotEnterpriseUsageMetrics(): FactoryProvider {
  return {
    provide: COPILOT_COPILOT_ENTERPRISE_USAGE_METRICS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string) =>
        httpResource<CopilotCopilotEnterpriseUsageMetricsResponse>(() => ({
          url: `${base}/enterprises/${enterprise}/copilot/metrics/reports/enterprise-28-day/latest`,
        }));
    },
  };
}
