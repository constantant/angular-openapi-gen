import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ENTERPRISE_TEAMS_DELETE = new InjectionToken<
  (
    enterprise: string,
    teamSlug: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ENTERPRISE_TEAMS_DELETE');

export function provideEnterpriseTeamsDelete(): FactoryProvider {
  return {
    provide: ENTERPRISE_TEAMS_DELETE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string, teamSlug: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/teams/${teamSlug}`,
          method: 'DELETE',
        }));
    },
  };
}
