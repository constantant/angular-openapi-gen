import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityListRepoEventsParams =
  paths['/repos/{owner}/{repo}/events']['get']['parameters']['query'];

export type ActivityListRepoEventsResponse =
  paths['/repos/{owner}/{repo}/events']['get']['responses']['200']['content']['application/json'];

export const ACTIVITY_LIST_REPO_EVENTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActivityListRepoEventsParams
      | (() => ActivityListRepoEventsParams | undefined),
  ) => ReturnType<typeof httpResource<ActivityListRepoEventsResponse>>
>('ACTIVITY_LIST_REPO_EVENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | ActivityListRepoEventsParams
        | (() => ActivityListRepoEventsParams | undefined),
    ) =>
      httpResource<ActivityListRepoEventsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/events`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
