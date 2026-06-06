import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsCreateForReleaseBody = NonNullable<
  paths['/repos/{owner}/{repo}/releases/{release_id}/reactions']['post']['requestBody']
>['content']['application/json'];

export type ReactionsCreateForReleaseResponse =
  paths['/repos/{owner}/{repo}/releases/{release_id}/reactions']['post']['responses']['200']['content']['application/json'];

export const REACTIONS_CREATE_FOR_RELEASE = new InjectionToken<
  (
    owner: string,
    repo: string,
    releaseId: string,
    body: ReactionsCreateForReleaseBody | Signal<ReactionsCreateForReleaseBody>,
  ) => ReturnType<typeof httpResource<ReactionsCreateForReleaseResponse>>
>('REACTIONS_CREATE_FOR_RELEASE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      releaseId: string,
      body:
        | ReactionsCreateForReleaseBody
        | Signal<ReactionsCreateForReleaseBody>,
    ) =>
      httpResource<ReactionsCreateForReleaseResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/releases/${releaseId}/reactions`,
        method: 'POST',
        body,
      }));
  },
});
