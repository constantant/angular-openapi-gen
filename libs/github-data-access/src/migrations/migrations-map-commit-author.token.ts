import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsMapCommitAuthorBody = NonNullable<
  paths['/repos/{owner}/{repo}/import/authors/{author_id}']['patch']['requestBody']
>['content']['application/json'];

export type MigrationsMapCommitAuthorResponse =
  paths['/repos/{owner}/{repo}/import/authors/{author_id}']['patch']['responses']['200']['content']['application/json'];

export const MIGRATIONS_MAP_COMMIT_AUTHOR = new InjectionToken<
  (
    owner: string,
    repo: string,
    authorId: string,
    body: MigrationsMapCommitAuthorBody | Signal<MigrationsMapCommitAuthorBody>,
  ) => ReturnType<typeof httpResource<MigrationsMapCommitAuthorResponse>>
>('MIGRATIONS_MAP_COMMIT_AUTHOR');

export function provideMigrationsMapCommitAuthor(): FactoryProvider {
  return {
    provide: MIGRATIONS_MAP_COMMIT_AUTHOR,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        authorId: string,
        body:
          | MigrationsMapCommitAuthorBody
          | Signal<MigrationsMapCommitAuthorBody>,
      ) =>
        httpResource<MigrationsMapCommitAuthorResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/import/authors/${authorId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
