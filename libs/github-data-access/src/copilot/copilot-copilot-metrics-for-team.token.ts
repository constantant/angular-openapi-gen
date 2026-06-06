import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotMetricsForTeamParams =
  paths['/orgs/{org}/team/{team_slug}/copilot/metrics']['get']['parameters']['query'];

export type CopilotCopilotMetricsForTeamResponse =
  paths['/orgs/{org}/team/{team_slug}/copilot/metrics']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_METRICS_FOR_TEAM = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    params?:
      | CopilotCopilotMetricsForTeamParams
      | (() => CopilotCopilotMetricsForTeamParams | undefined),
  ) => ReturnType<typeof httpResource<CopilotCopilotMetricsForTeamResponse>>
>('COPILOT_COPILOT_METRICS_FOR_TEAM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      teamSlug: string,
      params?:
        | CopilotCopilotMetricsForTeamParams
        | (() => CopilotCopilotMetricsForTeamParams | undefined),
    ) =>
      httpResource<CopilotCopilotMetricsForTeamResponse>(() => ({
        url: `${base}/orgs/${org}/team/${teamSlug}/copilot/metrics`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
