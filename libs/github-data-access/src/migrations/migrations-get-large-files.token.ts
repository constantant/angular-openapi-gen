import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsGetLargeFilesResponse =
  paths['/repos/{owner}/{repo}/import/large_files']['get']['responses']['200']['content']['application/json'];

export const MIGRATIONS_GET_LARGE_FILES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<MigrationsGetLargeFilesResponse>>
>('MIGRATIONS_GET_LARGE_FILES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<MigrationsGetLargeFilesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/import/large_files`,
      }));
  },
});
