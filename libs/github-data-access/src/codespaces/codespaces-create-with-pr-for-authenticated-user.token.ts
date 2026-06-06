import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesCreateWithPrForAuthenticatedUserBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/codespaces']['post']['requestBody']
>['content']['application/json'];

export type CodespacesCreateWithPrForAuthenticatedUserResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/codespaces']['post']['responses']['201']['content']['application/json'];

export const CODESPACES_CREATE_WITH_PR_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      owner: string,
      repo: string,
      pullNumber: string,
      body:
        | CodespacesCreateWithPrForAuthenticatedUserBody
        | Signal<CodespacesCreateWithPrForAuthenticatedUserBody>,
    ) => ReturnType<
      typeof httpResource<CodespacesCreateWithPrForAuthenticatedUserResponse>
    >
  >('CODESPACES_CREATE_WITH_PR_FOR_AUTHENTICATED_USER');

export function provideCodespacesCreateWithPrForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_CREATE_WITH_PR_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        pullNumber: string,
        body:
          | CodespacesCreateWithPrForAuthenticatedUserBody
          | Signal<CodespacesCreateWithPrForAuthenticatedUserBody>,
      ) =>
        httpResource<CodespacesCreateWithPrForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/codespaces`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
