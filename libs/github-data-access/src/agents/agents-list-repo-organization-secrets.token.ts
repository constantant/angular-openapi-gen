import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsListRepoOrganizationSecretsParams =
  paths['/repos/{owner}/{repo}/agents/organization-secrets']['get']['parameters']['query'];

export type AgentsListRepoOrganizationSecretsResponse =
  paths['/repos/{owner}/{repo}/agents/organization-secrets']['get']['responses']['200']['content']['application/json'];

export const AGENTS_LIST_REPO_ORGANIZATION_SECRETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | AgentsListRepoOrganizationSecretsParams
      | (() => AgentsListRepoOrganizationSecretsParams | undefined),
  ) => ReturnType<
    typeof httpResource<AgentsListRepoOrganizationSecretsResponse>
  >
>('AGENTS_LIST_REPO_ORGANIZATION_SECRETS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | AgentsListRepoOrganizationSecretsParams
        | (() => AgentsListRepoOrganizationSecretsParams | undefined),
    ) =>
      httpResource<AgentsListRepoOrganizationSecretsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/agents/organization-secrets`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
