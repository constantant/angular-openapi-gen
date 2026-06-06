import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksListSuitesForRefParams =
  paths['/repos/{owner}/{repo}/commits/{ref}/check-suites']['get']['parameters']['query'];

export type ChecksListSuitesForRefResponse =
  paths['/repos/{owner}/{repo}/commits/{ref}/check-suites']['get']['responses']['200']['content']['application/json'];

export const CHECKS_LIST_SUITES_FOR_REF = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
    params?:
      | ChecksListSuitesForRefParams
      | (() => ChecksListSuitesForRefParams | undefined),
  ) => ReturnType<typeof httpResource<ChecksListSuitesForRefResponse>>
>('CHECKS_LIST_SUITES_FOR_REF');

export function provideChecksListSuitesForRef(): FactoryProvider {
  return {
    provide: CHECKS_LIST_SUITES_FOR_REF,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        ref: string,
        params?:
          | ChecksListSuitesForRefParams
          | (() => ChecksListSuitesForRefParams | undefined),
      ) =>
        httpResource<ChecksListSuitesForRefResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/commits/${ref}/check-suites`,
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
