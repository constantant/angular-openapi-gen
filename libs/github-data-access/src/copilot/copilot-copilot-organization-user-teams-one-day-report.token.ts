import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotOrganizationUserTeamsOneDayReportParams =
  paths['/orgs/{org}/copilot/metrics/reports/user-teams-1-day']['get']['parameters']['query'];

export type CopilotCopilotOrganizationUserTeamsOneDayReportResponse =
  paths['/orgs/{org}/copilot/metrics/reports/user-teams-1-day']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_ORGANIZATION_USER_TEAMS_ONE_DAY_REPORT =
  new InjectionToken<
    (
      org: string,
      params?:
        | CopilotCopilotOrganizationUserTeamsOneDayReportParams
        | (() =>
            | CopilotCopilotOrganizationUserTeamsOneDayReportParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<CopilotCopilotOrganizationUserTeamsOneDayReportResponse>
    >
  >('COPILOT_COPILOT_ORGANIZATION_USER_TEAMS_ONE_DAY_REPORT', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | CopilotCopilotOrganizationUserTeamsOneDayReportParams
          | (() =>
              | CopilotCopilotOrganizationUserTeamsOneDayReportParams
              | undefined),
      ) =>
        httpResource<CopilotCopilotOrganizationUserTeamsOneDayReportResponse>(
          () => ({
            url: `${base}/orgs/${org}/copilot/metrics/reports/user-teams-1-day`,
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
