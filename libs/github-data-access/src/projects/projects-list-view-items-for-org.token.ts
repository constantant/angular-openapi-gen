import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsListViewItemsForOrgParams =
  paths['/orgs/{org}/projectsV2/{project_number}/views/{view_number}/items']['get']['parameters']['query'];

export type ProjectsListViewItemsForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/views/{view_number}/items']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_LIST_VIEW_ITEMS_FOR_ORG = new InjectionToken<
  (
    projectNumber: string,
    org: string,
    viewNumber: string,
    params?:
      | ProjectsListViewItemsForOrgParams
      | (() => ProjectsListViewItemsForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsListViewItemsForOrgResponse>>
>('PROJECTS_LIST_VIEW_ITEMS_FOR_ORG');

export function provideProjectsListViewItemsForOrg(): FactoryProvider {
  return {
    provide: PROJECTS_LIST_VIEW_ITEMS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        projectNumber: string,
        org: string,
        viewNumber: string,
        params?:
          | ProjectsListViewItemsForOrgParams
          | (() => ProjectsListViewItemsForOrgParams | undefined),
      ) =>
        httpResource<ProjectsListViewItemsForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/projectsV2/${projectNumber}/views/${viewNumber}/items`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
