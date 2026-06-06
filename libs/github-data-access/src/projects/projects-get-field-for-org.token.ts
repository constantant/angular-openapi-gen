import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsGetFieldForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/fields/{field_id}']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_GET_FIELD_FOR_ORG = new InjectionToken<
  (
    projectNumber: string,
    fieldId: string,
    org: string,
  ) => ReturnType<typeof httpResource<ProjectsGetFieldForOrgResponse>>
>('PROJECTS_GET_FIELD_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (projectNumber: string, fieldId: string, org: string) =>
      httpResource<ProjectsGetFieldForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/projectsV2/${projectNumber}/fields/${fieldId}`,
      }));
  },
});
