import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const MIGRATIONS_UNLOCK_REPO_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    migrationId: string,
    repoName: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('MIGRATIONS_UNLOCK_REPO_FOR_AUTHENTICATED_USER');

export function provideMigrationsUnlockRepoForAuthenticatedUser(): FactoryProvider {
  return {
    provide: MIGRATIONS_UNLOCK_REPO_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (migrationId: string, repoName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/migrations/${migrationId}/repos/${repoName}/lock`,
          method: 'DELETE',
        }));
    },
  };
}
