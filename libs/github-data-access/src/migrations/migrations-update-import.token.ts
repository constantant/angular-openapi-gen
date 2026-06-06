import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsUpdateImportBody = NonNullable<
  paths['/repos/{owner}/{repo}/import']['patch']['requestBody']
>['content']['application/json'];

export type MigrationsUpdateImportResponse =
  paths['/repos/{owner}/{repo}/import']['patch']['responses']['200']['content']['application/json'];

export const MIGRATIONS_UPDATE_IMPORT = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: MigrationsUpdateImportBody | Signal<MigrationsUpdateImportBody>,
  ) => ReturnType<typeof httpResource<MigrationsUpdateImportResponse>>
>('MIGRATIONS_UPDATE_IMPORT');

export function provideMigrationsUpdateImport(): FactoryProvider {
  return {
    provide: MIGRATIONS_UPDATE_IMPORT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: MigrationsUpdateImportBody | Signal<MigrationsUpdateImportBody>,
      ) =>
        httpResource<MigrationsUpdateImportResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/import`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
