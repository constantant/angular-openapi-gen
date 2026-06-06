import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesCreateResourceForUserBody = NonNullable<
  paths['/users/{username}/copilot-spaces/{space_number}/resources']['post']['requestBody']
>['content']['application/json'];

export type CopilotSpacesCreateResourceForUserResponse =
  paths['/users/{username}/copilot-spaces/{space_number}/resources']['post']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_CREATE_RESOURCE_FOR_USER = new InjectionToken<
  (
    username: string,
    spaceNumber: string,
    body:
      | CopilotSpacesCreateResourceForUserBody
      | Signal<CopilotSpacesCreateResourceForUserBody>,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesCreateResourceForUserResponse>
  >
>('COPILOT_SPACES_CREATE_RESOURCE_FOR_USER');

export function provideCopilotSpacesCreateResourceForUser(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_CREATE_RESOURCE_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        spaceNumber: string,
        body:
          | CopilotSpacesCreateResourceForUserBody
          | Signal<CopilotSpacesCreateResourceForUserBody>,
      ) =>
        httpResource<CopilotSpacesCreateResourceForUserResponse>(() => ({
          url: `${base}/users/${username}/copilot-spaces/${spaceNumber}/resources`,
          method: 'POST',
          body,
        }));
    },
  };
}
