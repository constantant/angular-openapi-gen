import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGenerateReleaseNotesBody = NonNullable<
  paths['/repos/{owner}/{repo}/releases/generate-notes']['post']['requestBody']
>['content']['application/json'];

export type ReposGenerateReleaseNotesResponse =
  paths['/repos/{owner}/{repo}/releases/generate-notes']['post']['responses']['200']['content']['application/json'];

export const REPOS_GENERATE_RELEASE_NOTES = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposGenerateReleaseNotesBody | Signal<ReposGenerateReleaseNotesBody>,
  ) => ReturnType<typeof httpResource<ReposGenerateReleaseNotesResponse>>
>('REPOS_GENERATE_RELEASE_NOTES');

export function provideReposGenerateReleaseNotes(): FactoryProvider {
  return {
    provide: REPOS_GENERATE_RELEASE_NOTES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ReposGenerateReleaseNotesBody
          | Signal<ReposGenerateReleaseNotesBody>,
      ) =>
        httpResource<ReposGenerateReleaseNotesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/releases/generate-notes`,
          method: 'POST',
          body,
        }));
    },
  };
}
