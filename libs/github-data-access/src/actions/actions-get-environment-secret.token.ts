import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetEnvironmentSecretResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ENVIRONMENT_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<ActionsGetEnvironmentSecretResponse>>
>('ACTIONS_GET_ENVIRONMENT_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      environmentName: string,
      secretName: string,
    ) =>
      httpResource<ActionsGetEnvironmentSecretResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/secrets/${secretName}`,
      }));
  },
});
