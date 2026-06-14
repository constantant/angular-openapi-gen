import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsAddFieldForUserBody = NonNullable<
  paths['/users/{username}/projectsV2/{project_number}/fields']['post']['requestBody']
>['content']['application/json'];

export type ProjectsAddFieldForUserResponse =
  paths['/users/{username}/projectsV2/{project_number}/fields']['post']['responses']['201']['content']['application/json'];

export const PROJECTS_ADD_FIELD_FOR_USER = new InjectionToken<
  (
    username: string,
    projectNumber: string,
    body: ProjectsAddFieldForUserBody | Signal<ProjectsAddFieldForUserBody>,
  ) => ReturnType<typeof httpResource<ProjectsAddFieldForUserResponse>>
>('PROJECTS_ADD_FIELD_FOR_USER');

export function provideProjectsAddFieldForUser(): FactoryProvider {
  return {
    provide: PROJECTS_ADD_FIELD_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        projectNumber: string,
        body: ProjectsAddFieldForUserBody | Signal<ProjectsAddFieldForUserBody>,
      ) =>
        httpResource<ProjectsAddFieldForUserResponse>(() => ({
          url: `${base}/users/${username}/projectsV2/${projectNumber}/fields`,
          method: 'POST',
          body,
        }));
    },
  };
}
