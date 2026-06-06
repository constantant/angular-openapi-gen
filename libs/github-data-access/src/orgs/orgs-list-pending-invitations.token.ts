import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListPendingInvitationsParams =
  paths['/orgs/{org}/invitations']['get']['parameters']['query'];

export type OrgsListPendingInvitationsResponse =
  paths['/orgs/{org}/invitations']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_PENDING_INVITATIONS = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListPendingInvitationsParams
      | (() => OrgsListPendingInvitationsParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListPendingInvitationsResponse>>
>('ORGS_LIST_PENDING_INVITATIONS');

export function provideOrgsListPendingInvitations(): FactoryProvider {
  return {
    provide: ORGS_LIST_PENDING_INVITATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListPendingInvitationsParams
          | (() => OrgsListPendingInvitationsParams | undefined),
      ) =>
        httpResource<OrgsListPendingInvitationsResponse>(() => ({
          url: `${base}/orgs/${org}/invitations`,
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
