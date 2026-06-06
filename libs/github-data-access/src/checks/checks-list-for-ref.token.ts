import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksListForRefParams =
  paths['/repos/{owner}/{repo}/commits/{ref}/check-runs']['get']['parameters']['query'];

export type ChecksListForRefResponse =
  paths['/repos/{owner}/{repo}/commits/{ref}/check-runs']['get']['responses']['200']['content']['application/json'];

export const CHECKS_LIST_FOR_REF = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
    params?:
      | ChecksListForRefParams
      | (() => ChecksListForRefParams | undefined),
  ) => ReturnType<typeof httpResource<ChecksListForRefResponse>>
>('CHECKS_LIST_FOR_REF', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      ref: string,
      params?:
        | ChecksListForRefParams
        | (() => ChecksListForRefParams | undefined),
    ) =>
      httpResource<ChecksListForRefResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/commits/${ref}/check-runs`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
