import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListCommitStatusesForRefParams =
  paths['/repos/{owner}/{repo}/commits/{ref}/statuses']['get']['parameters']['query'];

export type ReposListCommitStatusesForRefResponse =
  paths['/repos/{owner}/{repo}/commits/{ref}/statuses']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_COMMIT_STATUSES_FOR_REF = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
    params?:
      | ReposListCommitStatusesForRefParams
      | (() => ReposListCommitStatusesForRefParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListCommitStatusesForRefResponse>>
>('REPOS_LIST_COMMIT_STATUSES_FOR_REF');

export function provideReposListCommitStatusesForRef(): FactoryProvider {
  return {
    provide: REPOS_LIST_COMMIT_STATUSES_FOR_REF,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        ref: string,
        params?:
          | ReposListCommitStatusesForRefParams
          | (() => ReposListCommitStatusesForRefParams | undefined),
      ) =>
        httpResource<ReposListCommitStatusesForRefResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/commits/${ref}/statuses`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
