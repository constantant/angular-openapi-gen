import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotUsersUsageMetricsResponse =
  paths['/enterprises/{enterprise}/copilot/metrics/reports/users-28-day/latest']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_USERS_USAGE_METRICS = new InjectionToken<
  (
    enterprise: string,
  ) => ReturnType<typeof httpResource<CopilotCopilotUsersUsageMetricsResponse>>
>('COPILOT_COPILOT_USERS_USAGE_METRICS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (enterprise: string) =>
      httpResource<CopilotCopilotUsersUsageMetricsResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/copilot/metrics/reports/users-28-day/latest`,
      }));
  },
});
