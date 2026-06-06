import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotGetCopilotOrganizationDetailsResponse =
  paths['/orgs/{org}/copilot/billing']['get']['responses']['200']['content']['application/json'];

export const COPILOT_GET_COPILOT_ORGANIZATION_DETAILS = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<CopilotGetCopilotOrganizationDetailsResponse>
  >
>('COPILOT_GET_COPILOT_ORGANIZATION_DETAILS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<CopilotGetCopilotOrganizationDetailsResponse>(() => ({
        url: `${base}/orgs/${org}/copilot/billing`,
      }));
  },
});
