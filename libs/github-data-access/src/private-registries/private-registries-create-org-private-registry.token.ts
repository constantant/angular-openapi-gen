import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PrivateRegistriesCreateOrgPrivateRegistryBody = NonNullable<
  paths['/orgs/{org}/private-registries']['post']['requestBody']
>['content']['application/json'];

export type PrivateRegistriesCreateOrgPrivateRegistryResponse =
  paths['/orgs/{org}/private-registries']['post']['responses']['201']['content']['application/json'];

export const PRIVATE_REGISTRIES_CREATE_ORG_PRIVATE_REGISTRY =
  new InjectionToken<
    (
      org: string,
      body:
        | PrivateRegistriesCreateOrgPrivateRegistryBody
        | Signal<PrivateRegistriesCreateOrgPrivateRegistryBody>,
    ) => ReturnType<
      typeof httpResource<PrivateRegistriesCreateOrgPrivateRegistryResponse>
    >
  >('PRIVATE_REGISTRIES_CREATE_ORG_PRIVATE_REGISTRY');

export function providePrivateRegistriesCreateOrgPrivateRegistry(): FactoryProvider {
  return {
    provide: PRIVATE_REGISTRIES_CREATE_ORG_PRIVATE_REGISTRY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | PrivateRegistriesCreateOrgPrivateRegistryBody
          | Signal<PrivateRegistriesCreateOrgPrivateRegistryBody>,
      ) =>
        httpResource<PrivateRegistriesCreateOrgPrivateRegistryResponse>(() => ({
          url: `${base}/orgs/${org}/private-registries`,
          method: 'POST',
          body,
        }));
    },
  };
}
