import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsUpdateMembershipForAuthenticatedUserBody = NonNullable<
  paths['/user/memberships/orgs/{org}']['patch']['requestBody']
>['content']['application/json'];

export type OrgsUpdateMembershipForAuthenticatedUserResponse =
  paths['/user/memberships/orgs/{org}']['patch']['responses']['200']['content']['application/json'];

export const ORGS_UPDATE_MEMBERSHIP_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    org: string,
    body:
      | OrgsUpdateMembershipForAuthenticatedUserBody
      | Signal<OrgsUpdateMembershipForAuthenticatedUserBody>,
  ) => ReturnType<
    typeof httpResource<OrgsUpdateMembershipForAuthenticatedUserResponse>
  >
>('ORGS_UPDATE_MEMBERSHIP_FOR_AUTHENTICATED_USER');

export function provideOrgsUpdateMembershipForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ORGS_UPDATE_MEMBERSHIP_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | OrgsUpdateMembershipForAuthenticatedUserBody
          | Signal<OrgsUpdateMembershipForAuthenticatedUserBody>,
      ) =>
        httpResource<OrgsUpdateMembershipForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/memberships/orgs/${org}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
