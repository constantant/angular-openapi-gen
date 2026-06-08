import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type LicensesGetForRepoParams =
  paths['/repos/{owner}/{repo}/license']['get']['parameters']['query'];

export type LicensesGetForRepoResponse =
  paths['/repos/{owner}/{repo}/license']['get']['responses']['200']['content']['application/json'];

export const LICENSES_GET_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | LicensesGetForRepoParams
      | (() => LicensesGetForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<LicensesGetForRepoResponse>>
>('LICENSES_GET_FOR_REPO');

export function provideLicensesGetForRepo(): FactoryProvider {
  return {
    provide: LICENSES_GET_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | LicensesGetForRepoParams
          | (() => LicensesGetForRepoParams | undefined),
      ) =>
        httpResource<LicensesGetForRepoResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/license`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
