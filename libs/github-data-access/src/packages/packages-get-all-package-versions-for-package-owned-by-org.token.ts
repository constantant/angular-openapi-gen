import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesGetAllPackageVersionsForPackageOwnedByOrgParams =
  paths['/orgs/{org}/packages/{package_type}/{package_name}/versions']['get']['parameters']['query'];

export type PackagesGetAllPackageVersionsForPackageOwnedByOrgResponse =
  paths['/orgs/{org}/packages/{package_type}/{package_name}/versions']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_ORG =
  new InjectionToken<
    (
      packageType: string,
      packageName: string,
      org: string,
      params?:
        | PackagesGetAllPackageVersionsForPackageOwnedByOrgParams
        | (() =>
            | PackagesGetAllPackageVersionsForPackageOwnedByOrgParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<PackagesGetAllPackageVersionsForPackageOwnedByOrgResponse>
    >
  >('PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_ORG');

export function providePackagesGetAllPackageVersionsForPackageOwnedByOrg(): FactoryProvider {
  return {
    provide: PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        packageType: string,
        packageName: string,
        org: string,
        params?:
          | PackagesGetAllPackageVersionsForPackageOwnedByOrgParams
          | (() =>
              | PackagesGetAllPackageVersionsForPackageOwnedByOrgParams
              | undefined),
      ) =>
        httpResource<PackagesGetAllPackageVersionsForPackageOwnedByOrgResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/orgs/${org}/packages/${packageType}/${packageName}/versions`,
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
