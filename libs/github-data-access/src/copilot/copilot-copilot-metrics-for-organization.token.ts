import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotMetricsForOrganizationParams =
  paths['/orgs/{org}/copilot/metrics']['get']['parameters']['query'];

export type CopilotCopilotMetricsForOrganizationResponse =
  paths['/orgs/{org}/copilot/metrics']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_METRICS_FOR_ORGANIZATION = new InjectionToken<
  (
    org: string,
    params?:
      | CopilotCopilotMetricsForOrganizationParams
      | (() => CopilotCopilotMetricsForOrganizationParams | undefined),
  ) => ReturnType<
    typeof httpResource<CopilotCopilotMetricsForOrganizationResponse>
  >
>('COPILOT_COPILOT_METRICS_FOR_ORGANIZATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | CopilotCopilotMetricsForOrganizationParams
        | (() => CopilotCopilotMetricsForOrganizationParams | undefined),
    ) =>
      httpResource<CopilotCopilotMetricsForOrganizationResponse>(() => ({
        url: `${base}/orgs/${org}/copilot/metrics`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
