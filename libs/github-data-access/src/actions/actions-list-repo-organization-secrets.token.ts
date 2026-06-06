import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListRepoOrganizationSecretsParams =
  paths['/repos/{owner}/{repo}/actions/organization-secrets']['get']['parameters']['query'];

export type ActionsListRepoOrganizationSecretsResponse =
  paths['/repos/{owner}/{repo}/actions/organization-secrets']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_REPO_ORGANIZATION_SECRETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActionsListRepoOrganizationSecretsParams
      | (() => ActionsListRepoOrganizationSecretsParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActionsListRepoOrganizationSecretsResponse>
  >
>('ACTIONS_LIST_REPO_ORGANIZATION_SECRETS');

export function provideActionsListRepoOrganizationSecrets(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_REPO_ORGANIZATION_SECRETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActionsListRepoOrganizationSecretsParams
          | (() => ActionsListRepoOrganizationSecretsParams | undefined),
      ) =>
        httpResource<ActionsListRepoOrganizationSecretsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/organization-secrets`,
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
