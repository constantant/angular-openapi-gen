import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PrivateRegistriesGetOrgPrivateRegistryResponse =
  paths['/orgs/{org}/private-registries/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const PRIVATE_REGISTRIES_GET_ORG_PRIVATE_REGISTRY = new InjectionToken<
  (
    org: string,
    secretName: string,
  ) => ReturnType<
    typeof httpResource<PrivateRegistriesGetOrgPrivateRegistryResponse>
  >
>('PRIVATE_REGISTRIES_GET_ORG_PRIVATE_REGISTRY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, secretName: string) =>
      httpResource<PrivateRegistriesGetOrgPrivateRegistryResponse>(() => ({
        url: `${base}/orgs/${org}/private-registries/${secretName}`,
      }));
  },
});
