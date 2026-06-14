import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesAddCollaboratorForOrgBody = NonNullable<
  paths['/orgs/{org}/copilot-spaces/{space_number}/collaborators']['post']['requestBody']
>['content']['application/json'];

export type CopilotSpacesAddCollaboratorForOrgResponse =
  paths['/orgs/{org}/copilot-spaces/{space_number}/collaborators']['post']['responses']['201']['content']['application/json'];

export const COPILOT_SPACES_ADD_COLLABORATOR_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
    body:
      | CopilotSpacesAddCollaboratorForOrgBody
      | Signal<CopilotSpacesAddCollaboratorForOrgBody>,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesAddCollaboratorForOrgResponse>
  >
>('COPILOT_SPACES_ADD_COLLABORATOR_FOR_ORG');

export function provideCopilotSpacesAddCollaboratorForOrg(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_ADD_COLLABORATOR_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        spaceNumber: string,
        body:
          | CopilotSpacesAddCollaboratorForOrgBody
          | Signal<CopilotSpacesAddCollaboratorForOrgBody>,
      ) =>
        httpResource<CopilotSpacesAddCollaboratorForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}/collaborators`,
          method: 'POST',
          body,
        }));
    },
  };
}
