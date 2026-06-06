import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesListResourcesForUserResponse =
  paths['/users/{username}/copilot-spaces/{space_number}/resources']['get']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_LIST_RESOURCES_FOR_USER = new InjectionToken<
  (
    username: string,
    spaceNumber: string,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesListResourcesForUserResponse>
  >
>('COPILOT_SPACES_LIST_RESOURCES_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, spaceNumber: string) =>
      httpResource<CopilotSpacesListResourcesForUserResponse>(() => ({
        url: `${base}/users/${username}/copilot-spaces/${spaceNumber}/resources`,
      }));
  },
});
