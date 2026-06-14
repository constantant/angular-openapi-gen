import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsUpdateItemForOrgBody = NonNullable<
  paths['/orgs/{org}/projectsV2/{project_number}/items/{item_id}']['patch']['requestBody']
>['content']['application/json'];

export type ProjectsUpdateItemForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/items/{item_id}']['patch']['responses']['200']['content']['application/json'];

export const PROJECTS_UPDATE_ITEM_FOR_ORG = new InjectionToken<
  (
    projectNumber: string,
    org: string,
    itemId: string,
    body: ProjectsUpdateItemForOrgBody | Signal<ProjectsUpdateItemForOrgBody>,
  ) => ReturnType<typeof httpResource<ProjectsUpdateItemForOrgResponse>>
>('PROJECTS_UPDATE_ITEM_FOR_ORG');

export function provideProjectsUpdateItemForOrg(): FactoryProvider {
  return {
    provide: PROJECTS_UPDATE_ITEM_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        projectNumber: string,
        org: string,
        itemId: string,
        body:
          | ProjectsUpdateItemForOrgBody
          | Signal<ProjectsUpdateItemForOrgBody>,
      ) =>
        httpResource<ProjectsUpdateItemForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/projectsV2/${projectNumber}/items/${itemId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
