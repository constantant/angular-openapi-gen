import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsGetRepoSecretResponse =
  paths['/repos/{owner}/{repo}/agents/secrets/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const AGENTS_GET_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<AgentsGetRepoSecretResponse>>
>('AGENTS_GET_REPO_SECRET');

export function provideAgentsGetRepoSecret(): FactoryProvider {
  return {
    provide: AGENTS_GET_REPO_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, secretName: string) =>
        httpResource<AgentsGetRepoSecretResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/agents/secrets/${secretName}`,
        }));
    },
  };
}
