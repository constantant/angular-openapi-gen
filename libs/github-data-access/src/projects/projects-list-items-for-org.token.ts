import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsListItemsForOrgParams =
  paths['/orgs/{org}/projectsV2/{project_number}/items']['get']['parameters']['query'];

export type ProjectsListItemsForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/items']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_LIST_ITEMS_FOR_ORG = new InjectionToken<
  (
    projectNumber: string,
    org: string,
    params?:
      | ProjectsListItemsForOrgParams
      | (() => ProjectsListItemsForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsListItemsForOrgResponse>>
>('PROJECTS_LIST_ITEMS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      projectNumber: string,
      org: string,
      params?:
        | ProjectsListItemsForOrgParams
        | (() => ProjectsListItemsForOrgParams | undefined),
    ) =>
      httpResource<ProjectsListItemsForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/projectsV2/${projectNumber}/items`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
