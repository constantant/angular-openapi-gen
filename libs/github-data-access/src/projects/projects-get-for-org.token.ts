import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsGetForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_GET_FOR_ORG = new InjectionToken<
  (
    projectNumber: string,
    org: string,
  ) => ReturnType<typeof httpResource<ProjectsGetForOrgResponse>>
>('PROJECTS_GET_FOR_ORG');

export function provideProjectsGetForOrg(): FactoryProvider {
  return {
    provide: PROJECTS_GET_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (projectNumber: string, org: string) =>
        httpResource<ProjectsGetForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/projectsV2/${projectNumber}`,
        }));
    },
  };
}
