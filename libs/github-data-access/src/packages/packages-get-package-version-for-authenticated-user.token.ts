import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesGetPackageVersionForAuthenticatedUserResponse =
  paths['/user/packages/{package_type}/{package_name}/versions/{package_version_id}']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_GET_PACKAGE_VERSION_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      packageType: string,
      packageName: string,
      packageVersionId: string,
    ) => ReturnType<
      typeof httpResource<PackagesGetPackageVersionForAuthenticatedUserResponse>
    >
  >('PACKAGES_GET_PACKAGE_VERSION_FOR_AUTHENTICATED_USER');

export function providePackagesGetPackageVersionForAuthenticatedUser(): FactoryProvider {
  return {
    provide: PACKAGES_GET_PACKAGE_VERSION_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        packageType: string,
        packageName: string,
        packageVersionId: string,
      ) =>
        httpResource<PackagesGetPackageVersionForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/packages/${packageType}/${packageName}/versions/${packageVersionId}`,
          }),
        );
    },
  };
}
