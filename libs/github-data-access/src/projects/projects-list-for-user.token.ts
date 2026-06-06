import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsListForUserParams =
  paths['/users/{username}/projectsV2']['get']['parameters']['query'];

export type ProjectsListForUserResponse =
  paths['/users/{username}/projectsV2']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_LIST_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | ProjectsListForUserParams
      | (() => ProjectsListForUserParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsListForUserResponse>>
>('PROJECTS_LIST_FOR_USER');

export function provideProjectsListForUser(): FactoryProvider {
  return {
    provide: PROJECTS_LIST_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | ProjectsListForUserParams
          | (() => ProjectsListForUserParams | undefined),
      ) =>
        httpResource<ProjectsListForUserResponse>(() => ({
          url: `${base}/users/${username}/projectsV2`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
