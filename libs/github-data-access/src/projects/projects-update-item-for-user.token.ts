import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsUpdateItemForUserBody = NonNullable<
  paths['/users/{username}/projectsV2/{project_number}/items/{item_id}']['patch']['requestBody']
>['content']['application/json'];

export type ProjectsUpdateItemForUserResponse =
  paths['/users/{username}/projectsV2/{project_number}/items/{item_id}']['patch']['responses']['200']['content']['application/json'];

export const PROJECTS_UPDATE_ITEM_FOR_USER = new InjectionToken<
  (
    projectNumber: string,
    username: string,
    itemId: string,
    body: ProjectsUpdateItemForUserBody | Signal<ProjectsUpdateItemForUserBody>,
  ) => ReturnType<typeof httpResource<ProjectsUpdateItemForUserResponse>>
>('PROJECTS_UPDATE_ITEM_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      projectNumber: string,
      username: string,
      itemId: string,
      body:
        | ProjectsUpdateItemForUserBody
        | Signal<ProjectsUpdateItemForUserBody>,
    ) =>
      httpResource<ProjectsUpdateItemForUserResponse>(() => ({
        url: `${base}/users/${username}/projectsV2/${projectNumber}/items/${itemId}`,
        method: 'PATCH',
        body,
      }));
  },
});
