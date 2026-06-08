import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotListSelectedReposForOrgSecretParams =
  paths['/orgs/{org}/dependabot/secrets/{secret_name}/repositories']['get']['parameters']['query'];

export type DependabotListSelectedReposForOrgSecretResponse =
  paths['/orgs/{org}/dependabot/secrets/{secret_name}/repositories']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_LIST_SELECTED_REPOS_FOR_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    params?:
      | DependabotListSelectedReposForOrgSecretParams
      | (() => DependabotListSelectedReposForOrgSecretParams | undefined),
  ) => ReturnType<
    typeof httpResource<DependabotListSelectedReposForOrgSecretResponse>
  >
>('DEPENDABOT_LIST_SELECTED_REPOS_FOR_ORG_SECRET');

export function provideDependabotListSelectedReposForOrgSecret(): FactoryProvider {
  return {
    provide: DEPENDABOT_LIST_SELECTED_REPOS_FOR_ORG_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        secretName: string,
        params?:
          | DependabotListSelectedReposForOrgSecretParams
          | (() => DependabotListSelectedReposForOrgSecretParams | undefined),
      ) =>
        httpResource<DependabotListSelectedReposForOrgSecretResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/dependabot/secrets/${secretName}/repositories`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
