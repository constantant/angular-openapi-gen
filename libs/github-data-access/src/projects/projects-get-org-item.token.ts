import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ProjectsGetOrgItemParams =
  paths['/orgs/{org}/projectsV2/{project_number}/items/{item_id}']['get']['parameters']['query'];

export type ProjectsGetOrgItemResponse =
  paths['/orgs/{org}/projectsV2/{project_number}/items/{item_id}']['get']['responses']['200']['content']['application/json'];

export const PROJECTS_GET_ORG_ITEM = new InjectionToken<
  (
    projectNumber: string,
    org: string,
    itemId: string,
    params?:
      | ProjectsGetOrgItemParams
      | (() => ProjectsGetOrgItemParams | undefined),
  ) => ReturnType<typeof httpResource<ProjectsGetOrgItemResponse>>
>('PROJECTS_GET_ORG_ITEM');

export function provideProjectsGetOrgItem(): FactoryProvider {
  return {
    provide: PROJECTS_GET_ORG_ITEM,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        projectNumber: string,
        org: string,
        itemId: string,
        params?:
          | ProjectsGetOrgItemParams
          | (() => ProjectsGetOrgItemParams | undefined),
      ) =>
        httpResource<ProjectsGetOrgItemResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/projectsV2/${projectNumber}/items/${itemId}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
