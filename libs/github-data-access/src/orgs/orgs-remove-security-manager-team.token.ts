import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_REMOVE_SECURITY_MANAGER_TEAM = new InjectionToken<
  (org: string, teamSlug: string) => ReturnType<typeof httpResource<unknown>>
>('ORGS_REMOVE_SECURITY_MANAGER_TEAM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, teamSlug: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/security-managers/teams/${teamSlug}`,
        method: 'DELETE',
      }));
  },
});
