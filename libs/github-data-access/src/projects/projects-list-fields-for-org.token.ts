import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsListFieldsForOrgParams =
  paths['/orgs/{org}/projectsV2/{project_number}/fields']['get']['parameters']['query'];

export type ProjectsListFieldsForOrgResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/fields']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_LIST_FIELDS_FOR_ORG = new InjectionToken<
  (
    projectNumber: string,
    org: string,
    params?:
      | ProjectsListFieldsForOrgParams
      | (() => ProjectsListFieldsForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsListFieldsForOrgResponse>>
>('PROJECTS_LIST_FIELDS_FOR_ORG');

export function provideProjectsListFieldsForOrg(): FactoryProvider {
  return {
    provide: PROJECTS_LIST_FIELDS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        projectNumber: string,
        org: string,
        params?:
          | ProjectsListFieldsForOrgParams
          | (() => ProjectsListFieldsForOrgParams | undefined),
      ) =>
        httpResource<ProjectsListFieldsForOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/projectsV2/${projectNumber}/fields`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
