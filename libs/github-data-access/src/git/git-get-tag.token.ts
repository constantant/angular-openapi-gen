import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitGetTagResponse =
  paths['/repos/{owner}/{repo}/git/tags/{tag_sha}']['get']['responses']['200']['content']['application/json'];

export const GIT_GET_TAG = new InjectionToken<
  (
    owner: string,
    repo: string,
    tagSha: string,
  ) => ReturnType<typeof httpResource<GitGetTagResponse>>
>('GIT_GET_TAG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, tagSha: string) =>
      httpResource<GitGetTagResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/git/tags/${tagSha}`,
      }));
  },
});
