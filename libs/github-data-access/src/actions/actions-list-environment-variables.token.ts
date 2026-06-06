import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListEnvironmentVariablesParams =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/variables']['get']['parameters']['query'];

export type ActionsListEnvironmentVariablesResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/variables']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_ENVIRONMENT_VARIABLES = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    params?:
      | ActionsListEnvironmentVariablesParams
      | (() => ActionsListEnvironmentVariablesParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListEnvironmentVariablesResponse>>
>('ACTIONS_LIST_ENVIRONMENT_VARIABLES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environmentName: string,
      params?:
        | ActionsListEnvironmentVariablesParams
        | (() => ActionsListEnvironmentVariablesParams | undefined),
    ) =>
      httpResource<ActionsListEnvironmentVariablesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/variables`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
