import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsListFieldsForUserParams =
  paths['/users/{username}/projectsV2/{project_number}/fields']['get']['parameters']['query'];

export type ProjectsListFieldsForUserResponse =
  paths['/users/{username}/projectsV2/{project_number}/fields']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_LIST_FIELDS_FOR_USER = new InjectionToken<
  (
    projectNumber: string,
    username: string,
    params?:
      | ProjectsListFieldsForUserParams
      | (() => ProjectsListFieldsForUserParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsListFieldsForUserResponse>>
>('PROJECTS_LIST_FIELDS_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      projectNumber: string,
      username: string,
      params?:
        | ProjectsListFieldsForUserParams
        | (() => ProjectsListFieldsForUserParams | undefined),
    ) =>
      httpResource<ProjectsListFieldsForUserResponse>(() => ({
        url: `${base}/users/${username}/projectsV2/${projectNumber}/fields`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
