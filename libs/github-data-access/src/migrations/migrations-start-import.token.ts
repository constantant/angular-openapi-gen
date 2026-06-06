import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsStartImportBody = NonNullable<
  paths['/repos/{owner}/{repo}/import']['put']['requestBody']
>['content']['application/json'];

export type MigrationsStartImportResponse =
  paths['/repos/{owner}/{repo}/import']['put']['responses']['201']['content']['application/json'];

export const MIGRATIONS_START_IMPORT = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: MigrationsStartImportBody | Signal<MigrationsStartImportBody>,
  ) => ReturnType<typeof httpResource<MigrationsStartImportResponse>>
>('MIGRATIONS_START_IMPORT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: MigrationsStartImportBody | Signal<MigrationsStartImportBody>,
    ) =>
      httpResource<MigrationsStartImportResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/import`,
        method: 'PUT',
        body,
      }));
  },
});
