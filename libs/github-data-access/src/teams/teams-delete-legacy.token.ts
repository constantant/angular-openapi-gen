import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const TEAMS_DELETE_LEGACY = new InjectionToken<
  (teamId: string) => ReturnType<typeof httpResource<unknown>>
>('TEAMS_DELETE_LEGACY');

export function provideTeamsDeleteLegacy(): FactoryProvider {
  return {
    provide: TEAMS_DELETE_LEGACY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (teamId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/teams/${teamId}`,
          method: 'DELETE',
        }));
    },
  };
}
