import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesGetPackageVersionForOrganizationResponse =
  paths['/orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_GET_PACKAGE_VERSION_FOR_ORGANIZATION = new InjectionToken<
  (
    packageType: string,
    packageName: string,
    org: string,
    packageVersionId: string,
  ) => ReturnType<
    typeof httpResource<PackagesGetPackageVersionForOrganizationResponse>
  >
>('PACKAGES_GET_PACKAGE_VERSION_FOR_ORGANIZATION');

export function providePackagesGetPackageVersionForOrganization(): FactoryProvider {
  return {
    provide: PACKAGES_GET_PACKAGE_VERSION_FOR_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        packageType: string,
        packageName: string,
        org: string,
        packageVersionId: string,
      ) =>
        httpResource<PackagesGetPackageVersionForOrganizationResponse>(() => ({
          url: `${base}/orgs/${org}/packages/${packageType}/${packageName}/versions/${packageVersionId}`,
        }));
    },
  };
}
