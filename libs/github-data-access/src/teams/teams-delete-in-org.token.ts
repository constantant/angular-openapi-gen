import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const TEAMS_DELETE_IN_ORG = new InjectionToken<
  (org: string, teamSlug: string) => ReturnType<typeof httpResource<unknown>>
>('TEAMS_DELETE_IN_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, teamSlug: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/teams/${teamSlug}`,
        method: 'DELETE',
      }));
  },
});
