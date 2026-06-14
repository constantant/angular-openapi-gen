import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotOrganizationUsageMetricsResponse =
  paths['/orgs/{org}/copilot/metrics/reports/organization-28-day/latest']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_ORGANIZATION_USAGE_METRICS = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<CopilotCopilotOrganizationUsageMetricsResponse>
  >
>('COPILOT_COPILOT_ORGANIZATION_USAGE_METRICS');

export function provideCopilotCopilotOrganizationUsageMetrics(): FactoryProvider {
  return {
    provide: COPILOT_COPILOT_ORGANIZATION_USAGE_METRICS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<CopilotCopilotOrganizationUsageMetricsResponse>(() => ({
          url: `${base}/orgs/${org}/copilot/metrics/reports/organization-28-day/latest`,
        }));
    },
  };
}
