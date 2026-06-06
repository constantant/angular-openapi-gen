import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitGetCommitResponse =
  paths['/repos/{owner}/{repo}/git/commits/{commit_sha}']['get']['responses']['200']['content']['application/json'];

export const GIT_GET_COMMIT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commitSha: string,
  ) => ReturnType<typeof httpResource<GitGetCommitResponse>>
>('GIT_GET_COMMIT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, commitSha: string) =>
      httpResource<GitGetCommitResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/git/commits/${commitSha}`,
      }));
  },
});
