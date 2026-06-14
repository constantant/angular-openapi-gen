import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListMembersParams =
  paths['/orgs/{org}/members']['get']['parameters']['query'];

export type OrgsListMembersResponse =
  paths['/orgs/{org}/members']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_MEMBERS = new InjectionToken<
  (
    org: string,
    params?: OrgsListMembersParams | (() => OrgsListMembersParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListMembersResponse>>
>('ORGS_LIST_MEMBERS');

export function provideOrgsListMembers(): FactoryProvider {
  return {
    provide: ORGS_LIST_MEMBERS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListMembersParams
          | (() => OrgsListMembersParams | undefined),
      ) =>
        httpResource<OrgsListMembersResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/members`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
