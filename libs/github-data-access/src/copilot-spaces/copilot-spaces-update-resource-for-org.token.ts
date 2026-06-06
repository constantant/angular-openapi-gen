import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesUpdateResourceForOrgBody = NonNullable<
  paths['/orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}']['put']['requestBody']
>['content']['application/json'];

export type CopilotSpacesUpdateResourceForOrgResponse =
  paths['/orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}']['put']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_UPDATE_RESOURCE_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
    spaceResourceId: string,
    body:
      | CopilotSpacesUpdateResourceForOrgBody
      | Signal<CopilotSpacesUpdateResourceForOrgBody>,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesUpdateResourceForOrgResponse>
  >
>('COPILOT_SPACES_UPDATE_RESOURCE_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      spaceNumber: string,
      spaceResourceId: string,
      body:
        | CopilotSpacesUpdateResourceForOrgBody
        | Signal<CopilotSpacesUpdateResourceForOrgBody>,
    ) =>
      httpResource<CopilotSpacesUpdateResourceForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}/resources/${spaceResourceId}`,
        method: 'PUT',
        body,
      }));
  },
});
