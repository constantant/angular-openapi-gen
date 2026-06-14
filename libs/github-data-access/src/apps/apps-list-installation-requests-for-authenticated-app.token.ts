import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListInstallationRequestsForAuthenticatedAppParams =
  paths['/app/installation-requests']['get']['parameters']['query'];

export type AppsListInstallationRequestsForAuthenticatedAppResponse =
  paths['/app/installation-requests']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_INSTALLATION_REQUESTS_FOR_AUTHENTICATED_APP =
  new InjectionToken<
    (
      params?:
        | AppsListInstallationRequestsForAuthenticatedAppParams
        | (() =>
            | AppsListInstallationRequestsForAuthenticatedAppParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<AppsListInstallationRequestsForAuthenticatedAppResponse>
    >
  >('APPS_LIST_INSTALLATION_REQUESTS_FOR_AUTHENTICATED_APP');

export function provideAppsListInstallationRequestsForAuthenticatedApp(): FactoryProvider {
  return {
    provide: APPS_LIST_INSTALLATION_REQUESTS_FOR_AUTHENTICATED_APP,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | AppsListInstallationRequestsForAuthenticatedAppParams
          | (() =>
              | AppsListInstallationRequestsForAuthenticatedAppParams
              | undefined),
      ) =>
        httpResource<AppsListInstallationRequestsForAuthenticatedAppResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/app/installation-requests`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
        );
    },
  };
}
