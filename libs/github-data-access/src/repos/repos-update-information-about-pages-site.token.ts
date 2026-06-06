import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposUpdateInformationAboutPagesSiteBody = NonNullable<
  paths['/repos/{owner}/{repo}/pages']['put']['requestBody']
>['content']['application/json'];

export const REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | ReposUpdateInformationAboutPagesSiteBody
      | Signal<ReposUpdateInformationAboutPagesSiteBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_UPDATE_INFORMATION_ABOUT_PAGES_SITE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body:
        | ReposUpdateInformationAboutPagesSiteBody
        | Signal<ReposUpdateInformationAboutPagesSiteBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/pages`,
        method: 'PUT',
        body,
      }));
  },
});
