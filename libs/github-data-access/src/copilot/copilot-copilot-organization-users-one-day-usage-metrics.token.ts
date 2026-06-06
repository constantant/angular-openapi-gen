import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotOrganizationUsersOneDayUsageMetricsParams =
  paths['/orgs/{org}/copilot/metrics/reports/users-1-day']['get']['parameters']['query'];

export type CopilotCopilotOrganizationUsersOneDayUsageMetricsResponse =
  paths['/orgs/{org}/copilot/metrics/reports/users-1-day']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_ORGANIZATION_USERS_ONE_DAY_USAGE_METRICS =
  new InjectionToken<
    (
      org: string,
      params?:
        | CopilotCopilotOrganizationUsersOneDayUsageMetricsParams
        | (() =>
            | CopilotCopilotOrganizationUsersOneDayUsageMetricsParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<CopilotCopilotOrganizationUsersOneDayUsageMetricsResponse>
    >
  >('COPILOT_COPILOT_ORGANIZATION_USERS_ONE_DAY_USAGE_METRICS', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | CopilotCopilotOrganizationUsersOneDayUsageMetricsParams
          | (() =>
              | CopilotCopilotOrganizationUsersOneDayUsageMetricsParams
              | undefined),
      ) =>
        httpResource<CopilotCopilotOrganizationUsersOneDayUsageMetricsResponse>(
          () => ({
            url: `${base}/orgs/${org}/copilot/metrics/reports/users-1-day`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
