import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListParams =
  paths['/organizations']['get']['parameters']['query'];

export type OrgsListResponse =
  paths['/organizations']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST = new InjectionToken<
  (
    params?: OrgsListParams | (() => OrgsListParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListResponse>>
>('ORGS_LIST');

export function provideOrgsList(): FactoryProvider {
  return {
    provide: ORGS_LIST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (params?: OrgsListParams | (() => OrgsListParams | undefined)) =>
        httpResource<OrgsListResponse>(() => ({
          url: `${base}/organizations`,
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
