import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesListPackagesForOrganizationParams =
  paths['/orgs/{org}/packages']['get']['parameters']['query'];

export type PackagesListPackagesForOrganizationResponse =
  paths['/orgs/{org}/packages']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_LIST_PACKAGES_FOR_ORGANIZATION = new InjectionToken<
  (
    org: string,
    params?:
      | PackagesListPackagesForOrganizationParams
      | (() => PackagesListPackagesForOrganizationParams | undefined),
  ) => ReturnType<
    typeof httpResource<PackagesListPackagesForOrganizationResponse>
  >
>('PACKAGES_LIST_PACKAGES_FOR_ORGANIZATION');

export function providePackagesListPackagesForOrganization(): FactoryProvider {
  return {
    provide: PACKAGES_LIST_PACKAGES_FOR_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | PackagesListPackagesForOrganizationParams
          | (() => PackagesListPackagesForOrganizationParams | undefined),
      ) =>
        httpResource<PackagesListPackagesForOrganizationResponse>(() => ({
          url: `${base}/orgs/${org}/packages`,
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
