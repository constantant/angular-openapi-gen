import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_CHECK_PUBLIC_MEMBERSHIP_FOR_USER = new InjectionToken<
  (org: string, username: string) => ReturnType<typeof httpResource<unknown>>
>('ORGS_CHECK_PUBLIC_MEMBERSHIP_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, username: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/public_members/${username}`,
      }));
  },
});
