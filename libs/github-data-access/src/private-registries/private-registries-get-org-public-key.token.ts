import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PrivateRegistriesGetOrgPublicKeyResponse =
  paths['/orgs/{org}/private-registries/public-key']['get']['responses']['200']['content']['application/json'];

export const PRIVATE_REGISTRIES_GET_ORG_PUBLIC_KEY = new InjectionToken<
  (
    org: string,
  ) => ReturnType<typeof httpResource<PrivateRegistriesGetOrgPublicKeyResponse>>
>('PRIVATE_REGISTRIES_GET_ORG_PUBLIC_KEY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<PrivateRegistriesGetOrgPublicKeyResponse>(() => ({
        url: `${base}/orgs/${org}/private-registries/public-key`,
      }));
  },
});
