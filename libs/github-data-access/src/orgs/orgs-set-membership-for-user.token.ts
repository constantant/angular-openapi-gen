import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsSetMembershipForUserBody = NonNullable<
  paths['/orgs/{org}/memberships/{username}']['put']['requestBody']
>['content']['application/json'];

export type OrgsSetMembershipForUserResponse =
  paths['/orgs/{org}/memberships/{username}']['put']['responses']['200']['content']['application/json'];

export const ORGS_SET_MEMBERSHIP_FOR_USER = new InjectionToken<
  (
    org: string,
    username: string,
    body: OrgsSetMembershipForUserBody | Signal<OrgsSetMembershipForUserBody>,
  ) => ReturnType<typeof httpResource<OrgsSetMembershipForUserResponse>>
>('ORGS_SET_MEMBERSHIP_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      username: string,
      body: OrgsSetMembershipForUserBody | Signal<OrgsSetMembershipForUserBody>,
    ) =>
      httpResource<OrgsSetMembershipForUserResponse>(() => ({
        url: `${base}/orgs/${org}/memberships/${username}`,
        method: 'PUT',
        body,
      }));
  },
});
