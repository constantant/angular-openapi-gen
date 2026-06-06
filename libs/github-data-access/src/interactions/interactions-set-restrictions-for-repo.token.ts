import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type InteractionsSetRestrictionsForRepoBody = NonNullable<
  paths['/repos/{owner}/{repo}/interaction-limits']['put']['requestBody']
>['content']['application/json'];

export type InteractionsSetRestrictionsForRepoResponse =
  paths['/repos/{owner}/{repo}/interaction-limits']['put']['responses']['200']['content']['application/json'];

export const INTERACTIONS_SET_RESTRICTIONS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | InteractionsSetRestrictionsForRepoBody
      | Signal<InteractionsSetRestrictionsForRepoBody>,
  ) => ReturnType<
    typeof httpResource<InteractionsSetRestrictionsForRepoResponse>
  >
>('INTERACTIONS_SET_RESTRICTIONS_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body:
        | InteractionsSetRestrictionsForRepoBody
        | Signal<InteractionsSetRestrictionsForRepoBody>,
    ) =>
      httpResource<InteractionsSetRestrictionsForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/interaction-limits`,
        method: 'PUT',
        body,
      }));
  },
});
