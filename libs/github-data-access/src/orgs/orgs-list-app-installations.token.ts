import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListAppInstallationsParams =
  paths['/orgs/{org}/installations']['get']['parameters']['query'];

export type OrgsListAppInstallationsResponse =
  paths['/orgs/{org}/installations']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_APP_INSTALLATIONS = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListAppInstallationsParams
      | (() => OrgsListAppInstallationsParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListAppInstallationsResponse>>
>('ORGS_LIST_APP_INSTALLATIONS');

export function provideOrgsListAppInstallations(): FactoryProvider {
  return {
    provide: ORGS_LIST_APP_INSTALLATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListAppInstallationsParams
          | (() => OrgsListAppInstallationsParams | undefined),
      ) =>
        httpResource<OrgsListAppInstallationsResponse>(() => ({
          url: `${base}/orgs/${org}/installations`,
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
