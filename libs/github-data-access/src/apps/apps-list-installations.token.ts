import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsListInstallationsParams =
  paths['/app/installations']['get']['parameters']['query'];

export type AppsListInstallationsResponse =
  paths['/app/installations']['get']['responses']['200']['content']['application/json'];

export const APPS_LIST_INSTALLATIONS = new InjectionToken<
  (
    params?:
      | AppsListInstallationsParams
      | (() => AppsListInstallationsParams | undefined),
  ) => ReturnType<typeof httpResource<AppsListInstallationsResponse>>
>('APPS_LIST_INSTALLATIONS');

export function provideAppsListInstallations(): FactoryProvider {
  return {
    provide: APPS_LIST_INSTALLATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | AppsListInstallationsParams
          | (() => AppsListInstallationsParams | undefined),
      ) =>
        httpResource<AppsListInstallationsResponse>(() => ({
          url: `${base}/app/installations`,
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
