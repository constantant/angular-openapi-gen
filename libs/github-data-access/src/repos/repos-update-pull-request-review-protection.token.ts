import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdatePullRequestReviewProtectionBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdatePullRequestReviewProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposUpdatePullRequestReviewProtectionBody
      | Signal<ReposUpdatePullRequestReviewProtectionBody>,
  ) => ReturnType<
    typeof httpResource<ReposUpdatePullRequestReviewProtectionResponse>
  >
>('REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION');

export function provideReposUpdatePullRequestReviewProtection(): FactoryProvider {
  return {
    provide: REPOS_UPDATE_PULL_REQUEST_REVIEW_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposUpdatePullRequestReviewProtectionBody
          | Signal<ReposUpdatePullRequestReviewProtectionBody>,
      ) =>
        httpResource<ReposUpdatePullRequestReviewProtectionResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_pull_request_reviews`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
