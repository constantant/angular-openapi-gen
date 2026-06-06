import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetActionsCacheUsageResponse =
  paths['/repos/{owner}/{repo}/actions/cache/usage']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ACTIONS_CACHE_USAGE = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ActionsGetActionsCacheUsageResponse>>
>('ACTIONS_GET_ACTIONS_CACHE_USAGE');

export function provideActionsGetActionsCacheUsage(): FactoryProvider {
  return {
    provide: ACTIONS_GET_ACTIONS_CACHE_USAGE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ActionsGetActionsCacheUsageResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/cache/usage`,
        }));
    },
  };
}
