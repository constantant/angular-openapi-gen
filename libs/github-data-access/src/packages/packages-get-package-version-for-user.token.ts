import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesGetPackageVersionForUserResponse =
  paths['/users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_GET_PACKAGE_VERSION_FOR_USER = new InjectionToken<
  (
    packageType: string,
    packageName: string,
    packageVersionId: string,
    username: string,
  ) => ReturnType<typeof httpResource<PackagesGetPackageVersionForUserResponse>>
>('PACKAGES_GET_PACKAGE_VERSION_FOR_USER');

export function providePackagesGetPackageVersionForUser(): FactoryProvider {
  return {
    provide: PACKAGES_GET_PACKAGE_VERSION_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        packageType: string,
        packageName: string,
        packageVersionId: string,
        username: string,
      ) =>
        httpResource<PackagesGetPackageVersionForUserResponse>(() => ({
          url: `${base}/users/${username}/packages/${packageType}/${packageName}/versions/${packageVersionId}`,
        }));
    },
  };
}
