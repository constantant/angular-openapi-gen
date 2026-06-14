import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const MIGRATIONS_DOWNLOAD_ARCHIVE_FOR_ORG = new InjectionToken<
  (org: string, migrationId: string) => ReturnType<typeof httpResource<unknown>>
>('MIGRATIONS_DOWNLOAD_ARCHIVE_FOR_ORG');

export function provideMigrationsDownloadArchiveForOrg(): FactoryProvider {
  return {
    provide: MIGRATIONS_DOWNLOAD_ARCHIVE_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, migrationId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/migrations/${migrationId}/archive`,
        }));
    },
  };
}
