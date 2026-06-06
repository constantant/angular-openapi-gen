import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsGetRepoPublicKeyResponse =
  paths['/repos/{owner}/{repo}/agents/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const AGENTS_GET_REPO_PUBLIC_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<AgentsGetRepoPublicKeyResponse>>
>('AGENTS_GET_REPO_PUBLIC_KEY');

export function provideAgentsGetRepoPublicKey(): FactoryProvider {
  return {
    provide: AGENTS_GET_REPO_PUBLIC_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<AgentsGetRepoPublicKeyResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/agents/secrets/public-key`,
        }));
    },
  };
}
