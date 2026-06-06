import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsGetImportStatusResponse =
  paths['/repos/{owner}/{repo}/import']['get']['responses']['200']['content']['application/json'];

export const MIGRATIONS_GET_IMPORT_STATUS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<MigrationsGetImportStatusResponse>>
>('MIGRATIONS_GET_IMPORT_STATUS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<MigrationsGetImportStatusResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/import`,
      }));
  },
});
