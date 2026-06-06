import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsListViewItemsForUserParams =
  paths['/users/{username}/projectsV2/{project_number}/views/{view_number}/items']['get']['parameters']['query'];

export type ProjectsListViewItemsForUserResponse =
  paths['/users/{username}/projectsV2/{project_number}/views/{view_number}/items']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_LIST_VIEW_ITEMS_FOR_USER = new InjectionToken<
  (
    projectNumber: string,
    username: string,
    viewNumber: string,
    params?:
      | ProjectsListViewItemsForUserParams
      | (() => ProjectsListViewItemsForUserParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsListViewItemsForUserResponse>>
>('PROJECTS_LIST_VIEW_ITEMS_FOR_USER');

export function provideProjectsListViewItemsForUser(): FactoryProvider {
  return {
    provide: PROJECTS_LIST_VIEW_ITEMS_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        projectNumber: string,
        username: string,
        viewNumber: string,
        params?:
          | ProjectsListViewItemsForUserParams
          | (() => ProjectsListViewItemsForUserParams | undefined),
      ) =>
        httpResource<ProjectsListViewItemsForUserResponse>(() => ({
          url: `${base}/users/${username}/projectsV2/${projectNumber}/views/${viewNumber}/items`,
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
