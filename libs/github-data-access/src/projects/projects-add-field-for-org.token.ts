import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsAddFieldForOrgBody = NonNullable<
  paths['/orgs/{org}/projectsV2/{project_number}/fields']['post']['requestBody']
>['content']['application/json'];

export type ProjectsAddFieldForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/fields']['post']['responses']['201']['content']['application/json'];

export const PROJECTS_ADD_FIELD_FOR_ORG = new InjectionToken<
  (
    projectNumber: string,
    org: string,
    body: ProjectsAddFieldForOrgBody | Signal<ProjectsAddFieldForOrgBody>,
  ) => ReturnType<typeof httpResource<ProjectsAddFieldForOrgResponse>>
>('PROJECTS_ADD_FIELD_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      projectNumber: string,
      org: string,
      body: ProjectsAddFieldForOrgBody | Signal<ProjectsAddFieldForOrgBody>,
    ) =>
      httpResource<ProjectsAddFieldForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/projectsV2/${projectNumber}/fields`,
        method: 'POST',
        body,
      }));
  },
});
