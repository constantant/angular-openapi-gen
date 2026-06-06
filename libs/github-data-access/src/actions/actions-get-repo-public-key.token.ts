import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetRepoPublicKeyResponse =
  paths['/repos/{owner}/{repo}/actions/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_REPO_PUBLIC_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ActionsGetRepoPublicKeyResponse>>
>('ACTIONS_GET_REPO_PUBLIC_KEY');

export function provideActionsGetRepoPublicKey(): FactoryProvider {
  return {
    provide: ACTIONS_GET_REPO_PUBLIC_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetRepoPublicKeyResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/secrets/public-key`,
        }));
    },
  };
}
