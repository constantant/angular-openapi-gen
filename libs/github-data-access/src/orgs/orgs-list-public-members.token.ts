import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListPublicMembersParams =
  paths['/orgs/{org}/public_members']['get']['parameters']['query'];

export type OrgsListPublicMembersResponse =
  paths['/orgs/{org}/public_members']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_PUBLIC_MEMBERS = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListPublicMembersParams
      | (() => OrgsListPublicMembersParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListPublicMembersResponse>>
>('ORGS_LIST_PUBLIC_MEMBERS');

export function provideOrgsListPublicMembers(): FactoryProvider {
  return {
    provide: ORGS_LIST_PUBLIC_MEMBERS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListPublicMembersParams
          | (() => OrgsListPublicMembersParams | undefined),
      ) =>
        httpResource<OrgsListPublicMembersResponse>(() => ({
          url: `${base}/orgs/${org}/public_members`,
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
