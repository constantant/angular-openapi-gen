import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsCreateViewForOrgBody = NonNullable<
  paths['/orgs/{org}/projectsV2/{project_number}/views']['post']['requestBody']
>['content']['application/json'];

export type ProjectsCreateViewForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/views']['post']['responses']['201']['content']['application/json'];

export const PROJECTS_CREATE_VIEW_FOR_ORG = new InjectionToken<
  (
    org: string,
    projectNumber: string,
    body: ProjectsCreateViewForOrgBody | Signal<ProjectsCreateViewForOrgBody>,
  ) => ReturnType<typeof httpResource<ProjectsCreateViewForOrgResponse>>
>('PROJECTS_CREATE_VIEW_FOR_ORG');

export function provideProjectsCreateViewForOrg(): FactoryProvider {
  return {
    provide: PROJECTS_CREATE_VIEW_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        projectNumber: string,
        body:
          | ProjectsCreateViewForOrgBody
          | Signal<ProjectsCreateViewForOrgBody>,
      ) =>
        httpResource<ProjectsCreateViewForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/projectsV2/${projectNumber}/views`,
          method: 'POST',
          body,
        }));
    },
  };
}
