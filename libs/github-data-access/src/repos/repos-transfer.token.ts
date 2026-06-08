import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposTransferBody = NonNullable<
  paths['/repos/{owner}/{repo}/transfer']['post']['requestBody']
>['content']['application/json'];

export type ReposTransferResponse =
  paths['/repos/{owner}/{repo}/transfer']['post']['responses']['202']['content']['application/json'];

export const REPOS_TRANSFER = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposTransferBody | Signal<ReposTransferBody>,
  ) => ReturnType<typeof httpResource<ReposTransferResponse>>
>('REPOS_TRANSFER');

export function provideReposTransfer(): FactoryProvider {
  return {
    provide: REPOS_TRANSFER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposTransferBody | Signal<ReposTransferBody>,
      ) =>
        httpResource<ReposTransferResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/transfer`,
          method: 'POST',
          body,
        }));
    },
  };
}
