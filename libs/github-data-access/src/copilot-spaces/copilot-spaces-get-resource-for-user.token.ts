import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesGetResourceForUserResponse =
  paths['/users/{username}/copilot-spaces/{space_number}/resources/{space_resource_id}']['get']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_GET_RESOURCE_FOR_USER = new InjectionToken<
  (
    username: string,
    spaceNumber: string,
    spaceResourceId: string,
  ) => ReturnType<typeof httpResource<CopilotSpacesGetResourceForUserResponse>>
>('COPILOT_SPACES_GET_RESOURCE_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, spaceNumber: string, spaceResourceId: string) =>
      httpResource<CopilotSpacesGetResourceForUserResponse>(() => ({
        url: `${base}/users/${username}/copilot-spaces/${spaceNumber}/resources/${spaceResourceId}`,
      }));
  },
});
