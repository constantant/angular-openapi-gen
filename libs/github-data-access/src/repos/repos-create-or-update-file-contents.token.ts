import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateOrUpdateFileContentsBody = NonNullable<
  paths['/repos/{owner}/{repo}/contents/{path}']['put']['requestBody']
>['content']['application/json'];

export type ReposCreateOrUpdateFileContentsResponse =
  paths['/repos/{owner}/{repo}/contents/{path}']['put']['responses']['200']['content']['application/json'];

export const REPOS_CREATE_OR_UPDATE_FILE_CONTENTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    path: string,
    body:
      | ReposCreateOrUpdateFileContentsBody
      | Signal<ReposCreateOrUpdateFileContentsBody>,
  ) => ReturnType<typeof httpResource<ReposCreateOrUpdateFileContentsResponse>>
>('REPOS_CREATE_OR_UPDATE_FILE_CONTENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      path: string,
      body:
        | ReposCreateOrUpdateFileContentsBody
        | Signal<ReposCreateOrUpdateFileContentsBody>,
    ) =>
      httpResource<ReposCreateOrUpdateFileContentsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/contents/${path}`,
        method: 'PUT',
        body,
      }));
  },
});
