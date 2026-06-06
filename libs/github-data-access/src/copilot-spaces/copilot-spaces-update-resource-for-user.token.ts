import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesUpdateResourceForUserBody = NonNullable<
  paths['/users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}']['put']['requestBody']
>['content']['application/json'];

export type CopilotSpacesUpdateResourceForUserResponse =
  paths['/users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}']['put']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_UPDATE_RESOURCE_FOR_USER = new InjectionToken<
  (
    username: string,
    spaceNumber: string,
    spaceResourceId: string,
    body:
      | CopilotSpacesUpdateResourceForUserBody
      | Signal<CopilotSpacesUpdateResourceForUserBody>,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesUpdateResourceForUserResponse>
  >
>('COPILOT_SPACES_UPDATE_RESOURCE_FOR_USER');

export function provideCopilotSpacesUpdateResourceForUser(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_UPDATE_RESOURCE_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        spaceNumber: string,
        spaceResourceId: string,
        body:
          | CopilotSpacesUpdateResourceForUserBody
          | Signal<CopilotSpacesUpdateResourceForUserBody>,
      ) =>
        httpResource<CopilotSpacesUpdateResourceForUserResponse>(() => ({
          url: `${base}/users/${username}/copilot-spaces/${spaceNumber}/resources/${spaceResourceId}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
