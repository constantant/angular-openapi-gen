import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetPullRequestReviewProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<
    typeof httpResource<ReposGetPullRequestReviewProtectionResponse>
  >
>('REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION');

export function provideReposGetPullRequestReviewProtection(): FactoryProvider {
  return {
    provide: REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetPullRequestReviewProtectionResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_pull_request_reviews`,
        }));
    },
  };
}
