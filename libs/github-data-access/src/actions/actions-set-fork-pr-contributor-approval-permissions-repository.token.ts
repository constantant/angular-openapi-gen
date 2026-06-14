import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetForkPrContributorApprovalPermissionsRepositoryBody =
  NonNullable<
    paths['/repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      body:
        | ActionsSetForkPrContributorApprovalPermissionsRepositoryBody
        | Signal<ActionsSetForkPrContributorApprovalPermissionsRepositoryBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY');

export function provideActionsSetForkPrContributorApprovalPermissionsRepository(): FactoryProvider {
  return {
    provide: ACTIONS_SET_FORK_PR_CONTRIBUTOR_APPROVAL_PERMISSIONS_REPOSITORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsSetForkPrContributorApprovalPermissionsRepositoryBody
          | Signal<ActionsSetForkPrContributorApprovalPermissionsRepositoryBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/permissions/fork-pr-contributor-approval`,
          method: 'PUT',
          body,
        }));
    },
  };
}
