import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsGetForUserResponse =
  paths['/users/{username}/projectsV2/{project_number}']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_GET_FOR_USER = new InjectionToken<
  (
    projectNumber: string,
    username: string,
  ) => ReturnType<typeof httpResource<ProjectsGetForUserResponse>>
>('PROJECTS_GET_FOR_USER');

export function provideProjectsGetForUser(): FactoryProvider {
  return {
    provide: PROJECTS_GET_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (projectNumber: string, username: string) =>
        httpResource<ProjectsGetForUserResponse>(() => ({
          url: `${base}/users/${username}/projectsV2/${projectNumber}`,
        }));
    },
  };
}
