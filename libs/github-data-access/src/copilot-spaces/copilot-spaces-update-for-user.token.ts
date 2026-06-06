import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesUpdateForUserBody = NonNullable<
  paths['/users/{username}/copilot-spaces/{space_number}']['put']['requestBody']
>['content']['application/json'];

export type CopilotSpacesUpdateForUserResponse =
  paths['/users/{username}/copilot-spaces/{space_number}']['put']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_UPDATE_FOR_USER = new InjectionToken<
  (
    username: string,
    spaceNumber: string,
    body:
      | CopilotSpacesUpdateForUserBody
      | Signal<CopilotSpacesUpdateForUserBody>,
  ) => ReturnType<typeof httpResource<CopilotSpacesUpdateForUserResponse>>
>('COPILOT_SPACES_UPDATE_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      spaceNumber: string,
      body:
        | CopilotSpacesUpdateForUserBody
        | Signal<CopilotSpacesUpdateForUserBody>,
    ) =>
      httpResource<CopilotSpacesUpdateForUserResponse>(() => ({
        url: `${base}/users/${username}/copilot-spaces/${spaceNumber}`,
        method: 'PUT',
        body,
      }));
  },
});
