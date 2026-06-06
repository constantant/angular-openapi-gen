import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesGetForUserResponse =
  paths['/users/{username}/copilot-spaces/{space_number}']['get']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_GET_FOR_USER = new InjectionToken<
  (
    username: string,
    spaceNumber: string,
  ) => ReturnType<typeof httpResource<CopilotSpacesGetForUserResponse>>
>('COPILOT_SPACES_GET_FOR_USER');

export function provideCopilotSpacesGetForUser(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_GET_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (username: string, spaceNumber: string) =>
        httpResource<CopilotSpacesGetForUserResponse>(() => ({
          url: `${base}/users/${username}/copilot-spaces/${spaceNumber}`,
        }));
    },
  };
}
