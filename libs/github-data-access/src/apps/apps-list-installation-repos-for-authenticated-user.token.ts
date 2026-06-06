import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListInstallationReposForAuthenticatedUserParams =
  paths['/user/installations/{installation_id}/repositories']['get']['parameters']['query'];

export type AppsListInstallationReposForAuthenticatedUserResponse =
  paths['/user/installations/{installation_id}/repositories']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_INSTALLATION_REPOS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      installationId: string,
      params?:
        | AppsListInstallationReposForAuthenticatedUserParams
        | (() =>
            | AppsListInstallationReposForAuthenticatedUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<AppsListInstallationReposForAuthenticatedUserResponse>
    >
  >('APPS_LIST_INSTALLATION_REPOS_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        installationId: string,
        params?:
          | AppsListInstallationReposForAuthenticatedUserParams
          | (() =>
              | AppsListInstallationReposForAuthenticatedUserParams
              | undefined),
      ) =>
        httpResource<AppsListInstallationReposForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/installations/${installationId}/repositories`,
            params: (typeof params === 'function'
              ? params()
              : params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
