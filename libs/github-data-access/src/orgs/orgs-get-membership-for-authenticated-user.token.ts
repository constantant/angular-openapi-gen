import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetMembershipForAuthenticatedUserResponse =
  paths['/user/memberships/orgs/{org}']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_MEMBERSHIP_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<OrgsGetMembershipForAuthenticatedUserResponse>
  >
>('ORGS_GET_MEMBERSHIP_FOR_AUTHENTICATED_USER');

export function provideOrgsGetMembershipForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ORGS_GET_MEMBERSHIP_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<OrgsGetMembershipForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/memberships/orgs/${org}`,
        }));
    },
  };
}
