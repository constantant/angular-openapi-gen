import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsGetFieldForUserResponse =
  paths['/users/{username}/projectsV2/{project_number}/fields/{field_id}']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_GET_FIELD_FOR_USER = new InjectionToken<
  (
    projectNumber: string,
    fieldId: string,
    username: string,
  ) => ReturnType<typeof httpResource<ProjectsGetFieldForUserResponse>>
>('PROJECTS_GET_FIELD_FOR_USER');

export function provideProjectsGetFieldForUser(): FactoryProvider {
  return {
    provide: PROJECTS_GET_FIELD_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (projectNumber: string, fieldId: string, username: string) =>
        httpResource<ProjectsGetFieldForUserResponse>(() => ({
          url: `${base}/users/${username}/projectsV2/${projectNumber}/fields/${fieldId}`,
        }));
    },
  };
}
