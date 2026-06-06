import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotGetRepoSecretResponse =
  paths['/repos/{owner}/{repo}/dependabot/secrets/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_GET_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<DependabotGetRepoSecretResponse>>
>('DEPENDABOT_GET_REPO_SECRET');

export function provideDependabotGetRepoSecret(): FactoryProvider {
  return {
    provide: DEPENDABOT_GET_REPO_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, secretName: string) =>
        httpResource<DependabotGetRepoSecretResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/dependabot/secrets/${secretName}`,
        }));
    },
  };
}
