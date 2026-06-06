import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateReleaseBody = NonNullable<
  paths['/repos/{owner}/{repo}/releases/{release_id}']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdateReleaseResponse =
  paths['/repos/{owner}/{repo}/releases/{release_id}']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_RELEASE = new InjectionToken<
  (
    owner: string,
    repo: string,
    releaseId: string,
    body: ReposUpdateReleaseBody | Signal<ReposUpdateReleaseBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateReleaseResponse>>
>('REPOS_UPDATE_RELEASE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      releaseId: string,
      body: ReposUpdateReleaseBody | Signal<ReposUpdateReleaseBody>,
    ) =>
      httpResource<ReposUpdateReleaseResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/releases/${releaseId}`,
        method: 'PATCH',
        body,
      }));
  },
});
