import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotEnterpriseUserTeamsOneDayReportParams =
  paths['/enterprises/{enterprise}/copilot/metrics/reports/user-teams-1-day']['get']['parameters']['query'];

export type CopilotCopilotEnterpriseUserTeamsOneDayReportResponse =
  paths['/enterprises/{enterprise}/copilot/metrics/reports/user-teams-1-day']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_ENTERPRISE_USER_TEAMS_ONE_DAY_REPORT =
  new InjectionToken<
    (
      enterprise: string,
      params?:
        | CopilotCopilotEnterpriseUserTeamsOneDayReportParams
        | (() =>
            | CopilotCopilotEnterpriseUserTeamsOneDayReportParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<CopilotCopilotEnterpriseUserTeamsOneDayReportResponse>
    >
  >('COPILOT_COPILOT_ENTERPRISE_USER_TEAMS_ONE_DAY_REPORT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        params?:
          | CopilotCopilotEnterpriseUserTeamsOneDayReportParams
          | (() =>
              | CopilotCopilotEnterpriseUserTeamsOneDayReportParams
              | undefined),
      ) =>
        httpResource<CopilotCopilotEnterpriseUserTeamsOneDayReportResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/copilot/metrics/reports/user-teams-1-day`,
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
