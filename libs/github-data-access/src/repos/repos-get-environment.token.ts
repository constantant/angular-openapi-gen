import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetEnvironmentResponse =
  paths['/repos/{owner}/{repo}/environments/{environment_name}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_ENVIRONMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
  ) => ReturnType<typeof httpResource<ReposGetEnvironmentResponse>>
>('REPOS_GET_ENVIRONMENT');

export function provideReposGetEnvironment(): FactoryProvider {
  return {
    provide: REPOS_GET_ENVIRONMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, environmentName: string) =>
        httpResource<ReposGetEnvironmentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}`,
        }));
    },
  };
}
