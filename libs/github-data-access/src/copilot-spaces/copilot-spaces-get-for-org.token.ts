import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesGetForOrgResponse =
  paths['/orgs/{org}/copilot-spaces/{space_number}']['get']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_GET_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
  ) => ReturnType<typeof httpResource<CopilotSpacesGetForOrgResponse>>
>('COPILOT_SPACES_GET_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, spaceNumber: string) =>
      httpResource<CopilotSpacesGetForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}`,
      }));
  },
});
