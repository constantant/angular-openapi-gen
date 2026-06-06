import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PrivateRegistriesListOrgPrivateRegistriesParams =
  paths['/orgs/{org}/private-registries']['get']['parameters']['query'];

export type PrivateRegistriesListOrgPrivateRegistriesResponse =
  paths['/orgs/{org}/private-registries']['get']['responses']['200']['content']['application/json'];

export const PRIVATE_REGISTRIES_LIST_ORG_PRIVATE_REGISTRIES =
  new InjectionToken<
    (
      org: string,
      params?:
        | PrivateRegistriesListOrgPrivateRegistriesParams
        | (() => PrivateRegistriesListOrgPrivateRegistriesParams | undefined),
    ) => ReturnType<
      typeof httpResource<PrivateRegistriesListOrgPrivateRegistriesResponse>
    >
  >('PRIVATE_REGISTRIES_LIST_ORG_PRIVATE_REGISTRIES');

export function providePrivateRegistriesListOrgPrivateRegistries(): FactoryProvider {
  return {
    provide: PRIVATE_REGISTRIES_LIST_ORG_PRIVATE_REGISTRIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | PrivateRegistriesListOrgPrivateRegistriesParams
          | (() => PrivateRegistriesListOrgPrivateRegistriesParams | undefined),
      ) =>
        httpResource<PrivateRegistriesListOrgPrivateRegistriesResponse>(() => ({
          url: `${base}/orgs/${org}/private-registries`,
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
