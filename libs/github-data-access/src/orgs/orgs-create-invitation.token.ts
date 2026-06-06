import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCreateInvitationBody = NonNullable<
  paths['/orgs/{org}/invitations']['post']['requestBody']
>['content']['application/json'];

export type OrgsCreateInvitationResponse =
  paths['/orgs/{org}/invitations']['post']['responses']['201']['content']['application/json'];

export const ORGS_CREATE_INVITATION = new InjectionToken<
  (
    org: string,
    body: OrgsCreateInvitationBody | Signal<OrgsCreateInvitationBody>,
  ) => ReturnType<typeof httpResource<OrgsCreateInvitationResponse>>
>('ORGS_CREATE_INVITATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body: OrgsCreateInvitationBody | Signal<OrgsCreateInvitationBody>,
    ) =>
      httpResource<OrgsCreateInvitationResponse>(() => ({
        url: `${base}/orgs/${org}/invitations`,
        method: 'POST',
        body,
      }));
  },
});
