import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const TEAMS_ADD_MEMBER_LEGACY = new InjectionToken<
  (teamId: string, username: string) => ReturnType<typeof httpResource<unknown>>
>('TEAMS_ADD_MEMBER_LEGACY');

export function provideTeamsAddMemberLegacy(): FactoryProvider {
  return {
    provide: TEAMS_ADD_MEMBER_LEGACY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (teamId: string, username: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/teams/${teamId}/members/${username}`,
          method: 'PUT',
        }));
    },
  };
}
