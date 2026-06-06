import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsGetCommitAuthorsParams =
  paths['/repos/{owner}/{repo}/import/authors']['get']['parameters']['query'];

export type MigrationsGetCommitAuthorsResponse =
  paths['/repos/{owner}/{repo}/import/authors']['get']['responses']['200']['content']['application/json'];

export const MIGRATIONS_GET_COMMIT_AUTHORS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | MigrationsGetCommitAuthorsParams
      | (() => MigrationsGetCommitAuthorsParams | undefined),
  ) => ReturnType<typeof httpResource<MigrationsGetCommitAuthorsResponse>>
>('MIGRATIONS_GET_COMMIT_AUTHORS');

export function provideMigrationsGetCommitAuthors(): FactoryProvider {
  return {
    provide: MIGRATIONS_GET_COMMIT_AUTHORS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | MigrationsGetCommitAuthorsParams
          | (() => MigrationsGetCommitAuthorsParams | undefined),
      ) =>
        httpResource<MigrationsGetCommitAuthorsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/import/authors`,
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
