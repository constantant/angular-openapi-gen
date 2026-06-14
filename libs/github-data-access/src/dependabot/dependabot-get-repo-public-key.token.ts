import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotGetRepoPublicKeyResponse =
  paths['/repos/{owner}/{repo}/dependabot/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_GET_REPO_PUBLIC_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<DependabotGetRepoPublicKeyResponse>>
>('DEPENDABOT_GET_REPO_PUBLIC_KEY');

export function provideDependabotGetRepoPublicKey(): FactoryProvider {
  return {
    provide: DEPENDABOT_GET_REPO_PUBLIC_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<DependabotGetRepoPublicKeyResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/dependabot/secrets/public-key`,
        }));
    },
  };
}
