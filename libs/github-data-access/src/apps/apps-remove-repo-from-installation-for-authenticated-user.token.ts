import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const APPS_REMOVE_REPO_FROM_INSTALLATION_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      installationId: string,
      repositoryId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('APPS_REMOVE_REPO_FROM_INSTALLATION_FOR_AUTHENTICATED_USER');

export function provideAppsRemoveRepoFromInstallationForAuthenticatedUser(): FactoryProvider {
  return {
    provide: APPS_REMOVE_REPO_FROM_INSTALLATION_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (installationId: string, repositoryId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/installations/${installationId}/repositories/${repositoryId}`,
          method: 'DELETE',
        }));
    },
  };
}
