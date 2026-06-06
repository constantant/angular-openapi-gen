import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const PACKAGES_DELETE_PACKAGE_FOR_ORG = new InjectionToken<
  (
    packageType: string,
    packageName: string,
    org: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('PACKAGES_DELETE_PACKAGE_FOR_ORG');

export function providePackagesDeletePackageForOrg(): FactoryProvider {
  return {
    provide: PACKAGES_DELETE_PACKAGE_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (packageType: string, packageName: string, org: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/packages/${packageType}/${packageName}`,
          method: 'DELETE',
        }));
    },
  };
}
