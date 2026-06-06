import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesCreateWithRepoForAuthenticatedUserBody = NonNullable<
  paths['/repos/{owner}/{repo}/codespaces']['post']['requestBody']
>['content']['application/json'];

export type CodespacesCreateWithRepoForAuthenticatedUserResponse =
  paths['/repos/{owner}/{repo}/codespaces']['post']['responses']['201']['content']['application/json'];

export const CODESPACES_CREATE_WITH_REPO_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      body:
        | CodespacesCreateWithRepoForAuthenticatedUserBody
        | Signal<CodespacesCreateWithRepoForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<CodespacesCreateWithRepoForAuthenticatedUserResponse>
    >
  >('CODESPACES_CREATE_WITH_REPO_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | CodespacesCreateWithRepoForAuthenticatedUserBody
          | Signal<CodespacesCreateWithRepoForAuthenticatedUserBody>,
      ) =>
        httpResource<CodespacesCreateWithRepoForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/codespaces`,
            method: 'POST',
            body,
          }),
        );
    },
  });
