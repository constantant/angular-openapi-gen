import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListForAuthenticatedUserParams =
  paths['/user/orgs']['get']['parameters']['query'];

export type OrgsListForAuthenticatedUserResponse =
  paths['/user/orgs']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | OrgsListForAuthenticatedUserParams
      | (() => OrgsListForAuthenticatedUserParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListForAuthenticatedUserResponse>>
>('ORGS_LIST_FOR_AUTHENTICATED_USER');

export function provideOrgsListForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ORGS_LIST_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | OrgsListForAuthenticatedUserParams
          | (() => OrgsListForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<OrgsListForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/orgs`,
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
