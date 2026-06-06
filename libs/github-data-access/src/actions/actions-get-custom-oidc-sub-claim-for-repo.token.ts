import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetCustomOidcSubClaimForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/oidc/customization/sub']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetCustomOidcSubClaimForRepoResponse>
  >
>('ACTIONS_GET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO');

export function provideActionsGetCustomOidcSubClaimForRepo(): FactoryProvider {
  return {
    provide: ACTIONS_GET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetCustomOidcSubClaimForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/oidc/customization/sub`,
        }));
    },
  };
}
