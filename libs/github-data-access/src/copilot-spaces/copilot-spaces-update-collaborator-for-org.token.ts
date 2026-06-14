import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesUpdateCollaboratorForOrgBody = NonNullable<
  paths['/orgs/{org}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}']['put']['requestBody']
>['content']['application/json'];

export type CopilotSpacesUpdateCollaboratorForOrgResponse =
  paths['/orgs/{org}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}']['put']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
    actorType: string,
    actorIdentifier: string,
    body:
      | CopilotSpacesUpdateCollaboratorForOrgBody
      | Signal<CopilotSpacesUpdateCollaboratorForOrgBody>,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesUpdateCollaboratorForOrgResponse>
  >
>('COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_ORG');

export function provideCopilotSpacesUpdateCollaboratorForOrg(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        spaceNumber: string,
        actorType: string,
        actorIdentifier: string,
        body:
          | CopilotSpacesUpdateCollaboratorForOrgBody
          | Signal<CopilotSpacesUpdateCollaboratorForOrgBody>,
      ) =>
        httpResource<CopilotSpacesUpdateCollaboratorForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}/collaborators/${actorType}/${actorIdentifier}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
