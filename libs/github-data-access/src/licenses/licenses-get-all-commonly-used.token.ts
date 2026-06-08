import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('LICENSES_GET_ALL_COMMONLY_USED');

export function provideLicensesGetAllCommonlyUsed(): FactoryProvider {
  return {
    provide: LICENSES_GET_ALL_COMMONLY_USED,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | LicensesGetAllCommonlyUsedParams
          | (() => LicensesGetAllCommonlyUsedParams | undefined),
      ) =>
        httpResource<LicensesGetAllCommonlyUsedResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/licenses`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
