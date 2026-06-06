import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetCustomOidcSubClaimForRepoBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/oidc/customization/sub']['put']['requestBody']
>['content']['application/json'];

export type ActionsSetCustomOidcSubClaimForRepoResponse =
  paths['/repos/{owner}/{repo}/actions/oidc/customization/sub']['put']['responses']['201']['content']['application/json'];

export const ACTIONS_SET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | ActionsSetCustomOidcSubClaimForRepoBody
      | Signal<ActionsSetCustomOidcSubClaimForRepoBody>,
  ) => ReturnType<
    typeof httpResource<ActionsSetCustomOidcSubClaimForRepoResponse>
  >
>('ACTIONS_SET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO');

export function provideActionsSetCustomOidcSubClaimForRepo(): FactoryProvider {
  return {
    provide: ACTIONS_SET_CUSTOM_OIDC_SUB_CLAIM_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsSetCustomOidcSubClaimForRepoBody
          | Signal<ActionsSetCustomOidcSubClaimForRepoBody>,
      ) =>
        httpResource<ActionsSetCustomOidcSubClaimForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/oidc/customization/sub`,
          method: 'PUT',
          body,
        }));
    },
  };
}
