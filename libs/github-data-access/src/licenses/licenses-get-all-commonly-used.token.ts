import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type LicensesGetAllCommonlyUsedParams =
  paths['/licenses']['get']['parameters']['query'];

export type LicensesGetAllCommonlyUsedResponse =
  paths['/licenses']['get']['responses']['200']['content']['application/json'];

export const LICENSES_GET_ALL_COMMONLY_USED = new InjectionToken<
  (
    params?:
      | LicensesGetAllCommonlyUsedParams
      | (() => LicensesGetAllCommonlyUsedParams | undefined),
  ) => ReturnType<typeof httpResource<LicensesGetAllCommonlyUsedResponse>>
>('LICENSES_GET_ALL_COMMONLY_USED', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      params?:
        | LicensesGetAllCommonlyUsedParams
        | (() => LicensesGetAllCommonlyUsedParams | undefined),
    ) =>
      httpResource<LicensesGetAllCommonlyUsedResponse>(() => ({
        url: `${base}/licenses`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
