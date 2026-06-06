import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsListItemsForUserParams =
  paths['/users/{username}/projectsV2/{project_number}/items']['get']['parameters']['query'];

export type ProjectsListItemsForUserResponse =
  paths['/users/{username}/projectsV2/{project_number}/items']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_LIST_ITEMS_FOR_USER = new InjectionToken<
  (
    projectNumber: string,
    username: string,
    params?:
      | ProjectsListItemsForUserParams
      | (() => ProjectsListItemsForUserParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsListItemsForUserResponse>>
>('PROJECTS_LIST_ITEMS_FOR_USER');

export function provideProjectsListItemsForUser(): FactoryProvider {
  return {
    provide: PROJECTS_LIST_ITEMS_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        projectNumber: string,
        username: string,
        params?:
          | ProjectsListItemsForUserParams
          | (() => ProjectsListItemsForUserParams | undefined),
      ) =>
        httpResource<ProjectsListItemsForUserResponse>(() => ({
          url: `${base}/users/${username}/projectsV2/${projectNumber}/items`,
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
