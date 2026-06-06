import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetEnvironmentPublicKeyResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ENVIRONMENT_PUBLIC_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
  ) => ReturnType<typeof httpResource<ActionsGetEnvironmentPublicKeyResponse>>
>('ACTIONS_GET_ENVIRONMENT_PUBLIC_KEY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, environmentName: string) =>
      httpResource<ActionsGetEnvironmentPublicKeyResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/secrets/public-key`,
      }));
  },
});
