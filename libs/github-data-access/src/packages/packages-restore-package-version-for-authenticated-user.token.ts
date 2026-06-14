import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const PACKAGES_RESTORE_PACKAGE_VERSION_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      packageType: string,
      packageName: string,
      packageVersionId: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('PACKAGES_RESTORE_PACKAGE_VERSION_FOR_AUTHENTICATED_USER');

export function providePackagesRestorePackageVersionForAuthenticatedUser(): FactoryProvider {
  return {
    provide: PACKAGES_RESTORE_PACKAGE_VERSION_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        packageType: string,
        packageName: string,
        packageVersionId: string,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/packages/${packageType}/${packageName}/versions/${packageVersionId}/restore`,
          method: 'POST',
        }));
    },
  };
}
