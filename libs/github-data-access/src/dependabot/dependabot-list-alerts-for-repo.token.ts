import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotListAlertsForRepoParams =
  paths['/repos/{owner}/{repo}/dependabot/alerts']['get']['parameters']['query'];

export type DependabotListAlertsForRepoResponse =
  paths['/repos/{owner}/{repo}/dependabot/alerts']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_LIST_ALERTS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | DependabotListAlertsForRepoParams
      | (() => DependabotListAlertsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<DependabotListAlertsForRepoResponse>>
>('DEPENDABOT_LIST_ALERTS_FOR_REPO');

export function provideDependabotListAlertsForRepo(): FactoryProvider {
  return {
    provide: DEPENDABOT_LIST_ALERTS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | DependabotListAlertsForRepoParams
          | (() => DependabotListAlertsForRepoParams | undefined),
      ) =>
        httpResource<DependabotListAlertsForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/dependabot/alerts`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
