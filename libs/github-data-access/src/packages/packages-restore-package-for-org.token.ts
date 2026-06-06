import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const PACKAGES_RESTORE_PACKAGE_FOR_ORG = new InjectionToken<
  (
    packageType: string,
    packageName: string,
    org: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('PACKAGES_RESTORE_PACKAGE_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (packageType: string, packageName: string, org: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/packages/${packageType}/${packageName}/restore`,
        method: 'POST',
      }));
  },
});
