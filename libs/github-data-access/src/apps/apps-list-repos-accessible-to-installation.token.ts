import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListReposAccessibleToInstallationParams =
  paths['/installation/repositories']['get']['parameters']['query'];

export type AppsListReposAccessibleToInstallationResponse =
  paths['/installation/repositories']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_REPOS_ACCESSIBLE_TO_INSTALLATION = new InjectionToken<
  (
    params?:
      | AppsListReposAccessibleToInstallationParams
      | (() => AppsListReposAccessibleToInstallationParams | undefined),
  ) => ReturnType<
    typeof httpResource<AppsListReposAccessibleToInstallationResponse>
  >
>('APPS_LIST_REPOS_ACCESSIBLE_TO_INSTALLATION');

export function provideAppsListReposAccessibleToInstallation(): FactoryProvider {
  return {
    provide: APPS_LIST_REPOS_ACCESSIBLE_TO_INSTALLATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | AppsListReposAccessibleToInstallationParams
          | (() => AppsListReposAccessibleToInstallationParams | undefined),
      ) =>
        httpResource<AppsListReposAccessibleToInstallationResponse>(() => ({
          url: `${base}/installation/repositories`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
