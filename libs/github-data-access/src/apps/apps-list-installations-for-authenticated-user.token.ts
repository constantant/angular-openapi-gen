import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListInstallationsForAuthenticatedUserParams =
  paths['/user/installations']['get']['parameters']['query'];

export type AppsListInstallationsForAuthenticatedUserResponse =
  paths['/user/installations']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_INSTALLATIONS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?:
        | AppsListInstallationsForAuthenticatedUserParams
        | (() => AppsListInstallationsForAuthenticatedUserParams | undefined),
    ) => ReturnType<
      typeof httpResource<AppsListInstallationsForAuthenticatedUserResponse>
    >
  >('APPS_LIST_INSTALLATIONS_FOR_AUTHENTICATED_USER');

export function provideAppsListInstallationsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: APPS_LIST_INSTALLATIONS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | AppsListInstallationsForAuthenticatedUserParams
          | (() => AppsListInstallationsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<AppsListInstallationsForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/installations`,
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
