import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesCreateResourceForOrgBody = NonNullable<
  paths['/orgs/{org}/copilot-spaces/{space_number}/resources']['post']['requestBody']
>['content']['application/json'];

export type CopilotSpacesCreateResourceForOrgResponse =
  paths['/orgs/{org}/copilot-spaces/{space_number}/resources']['post']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_CREATE_RESOURCE_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
    body:
      | CopilotSpacesCreateResourceForOrgBody
      | Signal<CopilotSpacesCreateResourceForOrgBody>,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesCreateResourceForOrgResponse>
  >
>('COPILOT_SPACES_CREATE_RESOURCE_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      spaceNumber: string,
      body:
        | CopilotSpacesCreateResourceForOrgBody
        | Signal<CopilotSpacesCreateResourceForOrgBody>,
    ) =>
      httpResource<CopilotSpacesCreateResourceForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}/resources`,
        method: 'POST',
        body,
      }));
  },
});
