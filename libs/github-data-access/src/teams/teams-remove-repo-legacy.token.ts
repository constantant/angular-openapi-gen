import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const TEAMS_REMOVE_REPO_LEGACY = new InjectionToken<
  (
    teamId: string,
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('TEAMS_REMOVE_REPO_LEGACY');

export function provideTeamsRemoveRepoLegacy(): FactoryProvider {
  return {
    provide: TEAMS_REMOVE_REPO_LEGACY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (teamId: string, owner: string, repo: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/teams/${teamId}/repos/${owner}/${repo}`,
          method: 'DELETE',
        }));
    },
  };
}
