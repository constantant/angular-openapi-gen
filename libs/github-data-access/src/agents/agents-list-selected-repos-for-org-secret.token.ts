import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsListSelectedReposForOrgSecretParams =
  paths['/orgs/{org}/agents/secrets/{secret_name}/repositories']['get']['parameters']['query'];

export type AgentsListSelectedReposForOrgSecretResponse =
  paths['/orgs/{org}/agents/secrets/{secret_name}/repositories']['get']['responses']['200']['content']['application/json'];

export const AGENTS_LIST_SELECTED_REPOS_FOR_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    params?:
      | AgentsListSelectedReposForOrgSecretParams
      | (() => AgentsListSelectedReposForOrgSecretParams | undefined),
  ) => ReturnType<
    typeof httpResource<AgentsListSelectedReposForOrgSecretResponse>
  >
>('AGENTS_LIST_SELECTED_REPOS_FOR_ORG_SECRET');

export function provideAgentsListSelectedReposForOrgSecret(): FactoryProvider {
  return {
    provide: AGENTS_LIST_SELECTED_REPOS_FOR_ORG_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        secretName: string,
        params?:
          | AgentsListSelectedReposForOrgSecretParams
          | (() => AgentsListSelectedReposForOrgSecretParams | undefined),
      ) =>
        httpResource<AgentsListSelectedReposForOrgSecretResponse>(() => ({
          url: `${base}/orgs/${org}/agents/secrets/${secretName}/repositories`,
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
