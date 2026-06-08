import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesListSelectedReposForOrgSecretParams =
  paths['/orgs/{org}/codespaces/secrets/{secret_name}/repositories']['get']['parameters']['query'];

export type CodespacesListSelectedReposForOrgSecretResponse =
  paths['/orgs/{org}/codespaces/secrets/{secret_name}/repositories']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_LIST_SELECTED_REPOS_FOR_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    params?:
      | CodespacesListSelectedReposForOrgSecretParams
      | (() => CodespacesListSelectedReposForOrgSecretParams | undefined),
  ) => ReturnType<
    typeof httpResource<CodespacesListSelectedReposForOrgSecretResponse>
  >
>('CODESPACES_LIST_SELECTED_REPOS_FOR_ORG_SECRET');

export function provideCodespacesListSelectedReposForOrgSecret(): FactoryProvider {
  return {
    provide: CODESPACES_LIST_SELECTED_REPOS_FOR_ORG_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        secretName: string,
        params?:
          | CodespacesListSelectedReposForOrgSecretParams
          | (() => CodespacesListSelectedReposForOrgSecretParams | undefined),
      ) =>
        httpResource<CodespacesListSelectedReposForOrgSecretResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/codespaces/secrets/${secretName}/repositories`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
