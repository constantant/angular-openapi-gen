import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsAddItemForUserBody = NonNullable<
  paths['/users/{username}/projectsV2/{project_number}/items']['post']['requestBody']
>['content']['application/json'];

export type ProjectsAddItemForUserResponse =
  paths['/users/{username}/projectsV2/{project_number}/items']['post']['responses']['201']['content']['application/json'];

export const PROJECTS_ADD_ITEM_FOR_USER = new InjectionToken<
  (
    username: string,
    projectNumber: string,
    body: ProjectsAddItemForUserBody | Signal<ProjectsAddItemForUserBody>,
  ) => ReturnType<typeof httpResource<ProjectsAddItemForUserResponse>>
>('PROJECTS_ADD_ITEM_FOR_USER');

export function provideProjectsAddItemForUser(): FactoryProvider {
  return {
    provide: PROJECTS_ADD_ITEM_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        projectNumber: string,
        body: ProjectsAddItemForUserBody | Signal<ProjectsAddItemForUserBody>,
      ) =>
        httpResource<ProjectsAddItemForUserResponse>(() => ({
          url: `${base}/users/${username}/projectsV2/${projectNumber}/items`,
          method: 'POST',
          body,
        }));
    },
  };
}
