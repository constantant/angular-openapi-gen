import { InjectionToken, inject } from '@angular/core';
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
>('LICENSES_GET_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | LicensesGetForRepoParams
        | (() => LicensesGetForRepoParams | undefined),
    ) =>
      httpResource<LicensesGetForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/license`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
