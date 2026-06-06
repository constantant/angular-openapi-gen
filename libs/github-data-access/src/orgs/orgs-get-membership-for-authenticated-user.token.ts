import { InjectionToken, inject } from '@angular/core';
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
>('ORGS_GET_MEMBERSHIP_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<OrgsGetMembershipForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/memberships/orgs/${org}`,
      }));
  },
});
