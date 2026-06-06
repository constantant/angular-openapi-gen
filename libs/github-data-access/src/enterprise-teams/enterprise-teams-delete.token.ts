import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ENTERPRISE_TEAMS_DELETE = new InjectionToken<
  (
    enterprise: string,
    teamSlug: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ENTERPRISE_TEAMS_DELETE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (enterprise: string, teamSlug: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${teamSlug}`,
        method: 'DELETE',
      }));
  },
});
