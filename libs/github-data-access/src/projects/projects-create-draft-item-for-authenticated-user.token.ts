import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsCreateDraftItemForAuthenticatedUserBody = NonNullable<
  paths['/user/{user_id}/projectsV2/{project_number}/drafts']['post']['requestBody']
>['content']['application/json'];

export type ProjectsCreateDraftItemForAuthenticatedUserResponse =
  paths['/user/{user_id}/projectsV2/{project_number}/drafts']['post']['responses']['201']['content']['application/json'];

export const PROJECTS_CREATE_DRAFT_ITEM_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      userId: string,
      projectNumber: string,
      body:
        | ProjectsCreateDraftItemForAuthenticatedUserBody
        | Signal<ProjectsCreateDraftItemForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<ProjectsCreateDraftItemForAuthenticatedUserResponse>
    >
  >('PROJECTS_CREATE_DRAFT_ITEM_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        userId: string,
        projectNumber: string,
        body:
          | ProjectsCreateDraftItemForAuthenticatedUserBody
          | Signal<ProjectsCreateDraftItemForAuthenticatedUserBody>,
      ) =>
        httpResource<ProjectsCreateDraftItemForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/${userId}/projectsV2/${projectNumber}/drafts`,
            method: 'POST',
            body,
          }),
        );
    },
  });
