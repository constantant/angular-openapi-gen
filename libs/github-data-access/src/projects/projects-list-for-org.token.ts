import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsListForOrgParams =
  paths['/orgs/{org}/projectsV2']['get']['parameters']['query'];

export type ProjectsListForOrgResponse =
  paths['/orgs/{org}/projectsV2']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_LIST_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | ProjectsListForOrgParams
      | (() => ProjectsListForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsListForOrgResponse>>
>('PROJECTS_LIST_FOR_ORG');

export function provideProjectsListForOrg(): FactoryProvider {
  return {
    provide: PROJECTS_LIST_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ProjectsListForOrgParams
          | (() => ProjectsListForOrgParams | undefined),
      ) =>
        httpResource<ProjectsListForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/projectsV2`,
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
