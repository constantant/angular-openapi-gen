import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('CHECKS_LIST_FOR_REF');

export function provideChecksListForRef(): FactoryProvider {
  return {
    provide: CHECKS_LIST_FOR_REF,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        ref: string,
        params?:
          | ChecksListForRefParams
          | (() => ChecksListForRefParams | undefined),
      ) =>
        httpResource<ChecksListForRefResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/commits/${ref}/check-runs`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
