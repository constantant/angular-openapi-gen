import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsAddItemForOrgBody = NonNullable<
  paths['/orgs/{org}/projectsV2/{project_number}/items']['post']['requestBody']
>['content']['application/json'];

export type ProjectsAddItemForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/items']['post']['responses']['201']['content']['application/json'];

export const PROJECTS_ADD_ITEM_FOR_ORG = new InjectionToken<
  (
    org: string,
    projectNumber: string,
    body: ProjectsAddItemForOrgBody | Signal<ProjectsAddItemForOrgBody>,
  ) => ReturnType<typeof httpResource<ProjectsAddItemForOrgResponse>>
>('PROJECTS_ADD_ITEM_FOR_ORG');

export function provideProjectsAddItemForOrg(): FactoryProvider {
  return {
    provide: PROJECTS_ADD_ITEM_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        projectNumber: string,
        body: ProjectsAddItemForOrgBody | Signal<ProjectsAddItemForOrgBody>,
      ) =>
        httpResource<ProjectsAddItemForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/projectsV2/${projectNumber}/items`,
          method: 'POST',
          body,
        }));
    },
  };
}
