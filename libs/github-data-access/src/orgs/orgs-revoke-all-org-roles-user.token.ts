import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_REVOKE_ALL_ORG_ROLES_USER = new InjectionToken<
  (org: string, username: string) => ReturnType<typeof httpResource<unknown>>
>('ORGS_REVOKE_ALL_ORG_ROLES_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, username: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/organization-roles/users/${username}`,
        method: 'DELETE',
      }));
  },
});
