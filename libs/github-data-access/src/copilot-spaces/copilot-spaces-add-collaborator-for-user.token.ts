import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesAddCollaboratorForUserBody = NonNullable<
  paths['/users/{username}/copilot-spaces/{space_number}/collaborators']['post']['requestBody']
>['content']['application/json'];

export type CopilotSpacesAddCollaboratorForUserResponse =
  paths['/users/{username}/copilot-spaces/{space_number}/collaborators']['post']['responses']['201']['content']['application/json'];

export const COPILOT_SPACES_ADD_COLLABORATOR_FOR_USER = new InjectionToken<
  (
    username: string,
    spaceNumber: string,
    body:
      | CopilotSpacesAddCollaboratorForUserBody
      | Signal<CopilotSpacesAddCollaboratorForUserBody>,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesAddCollaboratorForUserResponse>
  >
>('COPILOT_SPACES_ADD_COLLABORATOR_FOR_USER');

export function provideCopilotSpacesAddCollaboratorForUser(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_ADD_COLLABORATOR_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        spaceNumber: string,
        body:
          | CopilotSpacesAddCollaboratorForUserBody
          | Signal<CopilotSpacesAddCollaboratorForUserBody>,
      ) =>
        httpResource<CopilotSpacesAddCollaboratorForUserResponse>(() => ({
          url: `${base}/users/${username}/copilot-spaces/${spaceNumber}/collaborators`,
          method: 'POST',
          body,
        }));
    },
  };
}
