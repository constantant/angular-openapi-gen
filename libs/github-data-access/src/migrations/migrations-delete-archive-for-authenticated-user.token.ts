import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const MIGRATIONS_DELETE_ARCHIVE_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (migrationId: string) => ReturnType<typeof httpResource<unknown>>
  >('MIGRATIONS_DELETE_ARCHIVE_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (migrationId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/migrations/${migrationId}/archive`,
          method: 'DELETE',
        }));
    },
  });
