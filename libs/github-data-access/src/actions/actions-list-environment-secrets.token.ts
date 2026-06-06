import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListEnvironmentSecretsParams =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/secrets']['get']['parameters']['query'];

export type ActionsListEnvironmentSecretsResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/secrets']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_ENVIRONMENT_SECRETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    params?:
      | ActionsListEnvironmentSecretsParams
      | (() => ActionsListEnvironmentSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListEnvironmentSecretsResponse>>
>('ACTIONS_LIST_ENVIRONMENT_SECRETS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environmentName: string,
      params?:
        | ActionsListEnvironmentSecretsParams
        | (() => ActionsListEnvironmentSecretsParams | undefined),
    ) =>
      httpResource<ActionsListEnvironmentSecretsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/secrets`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
