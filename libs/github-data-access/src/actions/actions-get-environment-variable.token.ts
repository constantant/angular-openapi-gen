import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetEnvironmentVariableResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ENVIRONMENT_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    name: string,
  ) => ReturnType<typeof httpResource<ActionsGetEnvironmentVariableResponse>>
>('ACTIONS_GET_ENVIRONMENT_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environmentName: string,
      name: string,
    ) =>
      httpResource<ActionsGetEnvironmentVariableResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/variables/${name}`,
      }));
  },
});
