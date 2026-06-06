import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ENTERPRISE_TEAM_MEMBERSHIPS_REMOVE = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    username: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ENTERPRISE_TEAM_MEMBERSHIPS_REMOVE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (enterprise: string, enterpriseTeam: string, username: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/memberships/${username}`,
        method: 'DELETE',
      }));
  },
});
