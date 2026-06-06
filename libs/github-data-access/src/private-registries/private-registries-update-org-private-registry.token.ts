import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PrivateRegistriesUpdateOrgPrivateRegistryBody = NonNullable<
  paths['/orgs/{org}/private-registries/{secret_name}']['patch']['requestBody']
>['content']['application/json'];

export const PRIVATE_REGISTRIES_UPDATE_ORG_PRIVATE_REGISTRY =
  new InjectionToken<
    (
      org: string,
      secretName: string,
      body:
        | PrivateRegistriesUpdateOrgPrivateRegistryBody
        | Signal<PrivateRegistriesUpdateOrgPrivateRegistryBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('PRIVATE_REGISTRIES_UPDATE_ORG_PRIVATE_REGISTRY', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        secretName: string,
        body:
          | PrivateRegistriesUpdateOrgPrivateRegistryBody
          | Signal<PrivateRegistriesUpdateOrgPrivateRegistryBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/private-registries/${secretName}`,
          method: 'PATCH',
          body,
        }));
    },
  });
