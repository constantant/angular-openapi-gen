import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsCreateViewForUserBody = NonNullable<
  paths['/users/{user_id}/projectsV2/{project_number}/views']['post']['requestBody']
>['content']['application/json'];

export type ProjectsCreateViewForUserResponse =
  paths['/users/{user_id}/projectsV2/{project_number}/views']['post']['responses']['201']['content']['application/json'];

export const PROJECTS_CREATE_VIEW_FOR_USER = new InjectionToken<
  (
    userId: string,
    projectNumber: string,
    body: ProjectsCreateViewForUserBody | Signal<ProjectsCreateViewForUserBody>,
  ) => ReturnType<typeof httpResource<ProjectsCreateViewForUserResponse>>
>('PROJECTS_CREATE_VIEW_FOR_USER');

export function provideProjectsCreateViewForUser(): FactoryProvider {
  return {
    provide: PROJECTS_CREATE_VIEW_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        userId: string,
        projectNumber: string,
        body:
          | ProjectsCreateViewForUserBody
          | Signal<ProjectsCreateViewForUserBody>,
      ) =>
        httpResource<ProjectsCreateViewForUserResponse>(() => ({
          url: `${base}/users/${userId}/projectsV2/${projectNumber}/views`,
          method: 'POST',
          body,
        }));
    },
  };
}
