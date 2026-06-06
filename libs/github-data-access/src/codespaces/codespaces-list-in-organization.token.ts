import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesListInOrganizationParams =
  paths['/orgs/{org}/codespaces']['get']['parameters']['query'];

export type CodespacesListInOrganizationResponse =
  paths['/orgs/{org}/codespaces']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_LIST_IN_ORGANIZATION = new InjectionToken<
  (
    org: string,
    params?:
      | CodespacesListInOrganizationParams
      | (() => CodespacesListInOrganizationParams | undefined),
  ) => ReturnType<typeof httpResource<CodespacesListInOrganizationResponse>>
>('CODESPACES_LIST_IN_ORGANIZATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | CodespacesListInOrganizationParams
        | (() => CodespacesListInOrganizationParams | undefined),
    ) =>
      httpResource<CodespacesListInOrganizationResponse>(() => ({
        url: `${base}/orgs/${org}/codespaces`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
