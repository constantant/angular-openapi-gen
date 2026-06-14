import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
  >('COPILOT_COPILOT_ENTERPRISE_USER_TEAMS_ONE_DAY_REPORT');

export function provideCopilotCopilotEnterpriseUserTeamsOneDayReport(): FactoryProvider {
  return {
    provide: COPILOT_COPILOT_ENTERPRISE_USER_TEAMS_ONE_DAY_REPORT,
    useFactory: () => {
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
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/enterprises/${enterprise}/copilot/metrics/reports/user-teams-1-day`,
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
