import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListPublicEventsForRepoNetworkParams =
  paths['/networks/{owner}/{repo}/events']['get']['parameters']['query'];

export type ActivityListPublicEventsForRepoNetworkResponse =
  paths['/networks/{owner}/{repo}/events']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_PUBLIC_EVENTS_FOR_REPO_NETWORK = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActivityListPublicEventsForRepoNetworkParams
      | (() => ActivityListPublicEventsForRepoNetworkParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActivityListPublicEventsForRepoNetworkResponse>
  >
>('ACTIVITY_LIST_PUBLIC_EVENTS_FOR_REPO_NETWORK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | ActivityListPublicEventsForRepoNetworkParams
        | (() => ActivityListPublicEventsForRepoNetworkParams | undefined),
    ) =>
      httpResource<ActivityListPublicEventsForRepoNetworkResponse>(() => ({
        url: `${base}/networks/${owner}/${repo}/events`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
