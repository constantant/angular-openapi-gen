import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesUpdateForOrgBody = NonNullable<
  paths['/orgs/{org}/copilot-spaces/{space_number}']['put']['requestBody']
>['content']['application/json'];

export type CopilotSpacesUpdateForOrgResponse =
  paths['/orgs/{org}/copilot-spaces/{space_number}']['put']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_UPDATE_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
    body: CopilotSpacesUpdateForOrgBody | Signal<CopilotSpacesUpdateForOrgBody>,
  ) => ReturnType<typeof httpResource<CopilotSpacesUpdateForOrgResponse>>
>('COPILOT_SPACES_UPDATE_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      spaceNumber: string,
      body:
        | CopilotSpacesUpdateForOrgBody
        | Signal<CopilotSpacesUpdateForOrgBody>,
    ) =>
      httpResource<CopilotSpacesUpdateForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}`,
        method: 'PUT',
        body,
      }));
  },
});
