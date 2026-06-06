import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_ACTIONS_CACHE_BY_ID = new InjectionToken<
  (
    owner: string,
    repo: string,
    cacheId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_ACTIONS_CACHE_BY_ID');

export function provideActionsDeleteActionsCacheById(): FactoryProvider {
  return {
    provide: ACTIONS_DELETE_ACTIONS_CACHE_BY_ID,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, cacheId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/caches/${cacheId}`,
          method: 'DELETE',
        }));
    },
  };
}
