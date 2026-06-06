import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesGetAllPackageVersionsForPackageOwnedByUserResponse =
  paths['/users/{username}/packages/{package_type}/{package_name}/versions']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_USER =
  new InjectionToken<
    (
      packageType: string,
      packageName: string,
      username: string,
    ) => ReturnType<
      typeof httpResource<PackagesGetAllPackageVersionsForPackageOwnedByUserResponse>
    >
  >('PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (packageType: string, packageName: string, username: string) =>
        httpResource<PackagesGetAllPackageVersionsForPackageOwnedByUserResponse>(
          () => ({
            url: `${base}/users/${username}/packages/${packageType}/${packageName}/versions`,
          }),
        );
    },
  });
