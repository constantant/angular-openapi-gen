import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesUpdateCollaboratorForUserBody = NonNullable<
  paths['/users/{username}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}']['put']['requestBody']
>['content']['application/json'];

export type CopilotSpacesUpdateCollaboratorForUserResponse =
  paths['/users/{username}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}']['put']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_USER = new InjectionToken<
  (
    username: string,
    spaceNumber: string,
    actorType: string,
    actorIdentifier: string,
    body:
      | CopilotSpacesUpdateCollaboratorForUserBody
      | Signal<CopilotSpacesUpdateCollaboratorForUserBody>,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesUpdateCollaboratorForUserResponse>
  >
>('COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_USER');

export function provideCopilotSpacesUpdateCollaboratorForUser(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        spaceNumber: string,
        actorType: string,
        actorIdentifier: string,
        body:
          | CopilotSpacesUpdateCollaboratorForUserBody
          | Signal<CopilotSpacesUpdateCollaboratorForUserBody>,
      ) =>
        httpResource<CopilotSpacesUpdateCollaboratorForUserResponse>(() => ({
          url: `${base}/users/${username}/copilot-spaces/${spaceNumber}/collaborators/${actorType}/${actorIdentifier}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
