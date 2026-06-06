import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesGetCodespacesForUserInOrgParams =
  paths['/orgs/{org}/members/{username}/codespaces']['get']['parameters']['query'];

export type CodespacesGetCodespacesForUserInOrgResponse =
  paths['/orgs/{org}/members/{username}/codespaces']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_GET_CODESPACES_FOR_USER_IN_ORG = new InjectionToken<
  (
    org: string,
    username: string,
    params?:
      | CodespacesGetCodespacesForUserInOrgParams
      | (() => CodespacesGetCodespacesForUserInOrgParams | undefined),
  ) => ReturnType<
    typeof httpResource<CodespacesGetCodespacesForUserInOrgResponse>
  >
>('CODESPACES_GET_CODESPACES_FOR_USER_IN_ORG');

export function provideCodespacesGetCodespacesForUserInOrg(): FactoryProvider {
  return {
    provide: CODESPACES_GET_CODESPACES_FOR_USER_IN_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        username: string,
        params?:
          | CodespacesGetCodespacesForUserInOrgParams
          | (() => CodespacesGetCodespacesForUserInOrgParams | undefined),
      ) =>
        httpResource<CodespacesGetCodespacesForUserInOrgResponse>(() => ({
          url: `${base}/orgs/${org}/members/${username}/codespaces`,
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
