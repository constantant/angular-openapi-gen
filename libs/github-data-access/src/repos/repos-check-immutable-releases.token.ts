import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCheckImmutableReleasesResponse =
  paths['/repos/{owner}/{repo}/immutable-releases']['get']['responses']['200']['content']['application/json'];

export const REPOS_CHECK_IMMUTABLE_RELEASES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposCheckImmutableReleasesResponse>>
>('REPOS_CHECK_IMMUTABLE_RELEASES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposCheckImmutableReleasesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/immutable-releases`,
      }));
  },
});
