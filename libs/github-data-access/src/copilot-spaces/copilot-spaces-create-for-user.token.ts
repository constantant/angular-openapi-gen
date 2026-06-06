import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesCreateForUserBody = NonNullable<
  paths['/users/{username}/copilot-spaces']['post']['requestBody']
>['content']['application/json'];

export type CopilotSpacesCreateForUserResponse =
  paths['/users/{username}/copilot-spaces']['post']['responses']['201']['content']['application/json'];

export const COPILOT_SPACES_CREATE_FOR_USER = new InjectionToken<
  (
    username: string,
    body:
      | CopilotSpacesCreateForUserBody
      | Signal<CopilotSpacesCreateForUserBody>,
  ) => ReturnType<typeof httpResource<CopilotSpacesCreateForUserResponse>>
>('COPILOT_SPACES_CREATE_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      body:
        | CopilotSpacesCreateForUserBody
        | Signal<CopilotSpacesCreateForUserBody>,
    ) =>
      httpResource<CopilotSpacesCreateForUserResponse>(() => ({
        url: `${base}/users/${username}/copilot-spaces`,
        method: 'POST',
        body,
      }));
  },
});
