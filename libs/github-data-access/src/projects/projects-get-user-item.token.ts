import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsGetUserItemParams =
  paths['/users/{username}/projectsV2/{project_number}/items/{item_id}']['get']['parameters']['query'];

export type ProjectsGetUserItemResponse =
  paths['/users/{username}/projectsV2/{project_number}/items/{item_id}']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_GET_USER_ITEM = new InjectionToken<
  (
    projectNumber: string,
    username: string,
    itemId: string,
    params?:
      | ProjectsGetUserItemParams
      | (() => ProjectsGetUserItemParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsGetUserItemResponse>>
>('PROJECTS_GET_USER_ITEM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      projectNumber: string,
      username: string,
      itemId: string,
      params?:
        | ProjectsGetUserItemParams
        | (() => ProjectsGetUserItemParams | undefined),
    ) =>
      httpResource<ProjectsGetUserItemResponse>(() => ({
        url: `${base}/users/${username}/projectsV2/${projectNumber}/items/${itemId}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
