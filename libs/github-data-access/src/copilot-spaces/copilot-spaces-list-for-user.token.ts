import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesListForUserParams =
  paths['/users/{username}/copilot-spaces']['get']['parameters']['query'];

export type CopilotSpacesListForUserResponse =
  paths['/users/{username}/copilot-spaces']['get']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_LIST_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | CopilotSpacesListForUserParams
      | (() => CopilotSpacesListForUserParams | undefined),
  ) => ReturnType<typeof httpResource<CopilotSpacesListForUserResponse>>
>('COPILOT_SPACES_LIST_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      params?:
        | CopilotSpacesListForUserParams
        | (() => CopilotSpacesListForUserParams | undefined),
    ) =>
      httpResource<CopilotSpacesListForUserResponse>(() => ({
        url: `${base}/users/${username}/copilot-spaces`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
