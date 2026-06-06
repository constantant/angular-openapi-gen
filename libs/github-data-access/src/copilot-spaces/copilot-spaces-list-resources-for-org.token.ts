import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesListResourcesForOrgResponse =
  paths['/orgs/{org}/copilot-spaces/{space_number}/resources']['get']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_LIST_RESOURCES_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
  ) => ReturnType<typeof httpResource<CopilotSpacesListResourcesForOrgResponse>>
>('COPILOT_SPACES_LIST_RESOURCES_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, spaceNumber: string) =>
      httpResource<CopilotSpacesListResourcesForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}/resources`,
      }));
  },
});
