import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetMembershipForUserResponse =
  paths['/orgs/{org}/memberships/{username}']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_MEMBERSHIP_FOR_USER = new InjectionToken<
  (
    org: string,
    username: string,
  ) => ReturnType<typeof httpResource<OrgsGetMembershipForUserResponse>>
>('ORGS_GET_MEMBERSHIP_FOR_USER');

export function provideOrgsGetMembershipForUser(): FactoryProvider {
  return {
    provide: ORGS_GET_MEMBERSHIP_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, username: string) =>
        httpResource<OrgsGetMembershipForUserResponse>(() => ({
          url: `${base}/orgs/${org}/memberships/${username}`,
        }));
    },
  };
}
