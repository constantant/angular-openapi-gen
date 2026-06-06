import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListFailedInvitationsParams =
  paths['/orgs/{org}/failed_invitations']['get']['parameters']['query'];

export type OrgsListFailedInvitationsResponse =
  paths['/orgs/{org}/failed_invitations']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_FAILED_INVITATIONS = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListFailedInvitationsParams
      | (() => OrgsListFailedInvitationsParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListFailedInvitationsResponse>>
>('ORGS_LIST_FAILED_INVITATIONS');

export function provideOrgsListFailedInvitations(): FactoryProvider {
  return {
    provide: ORGS_LIST_FAILED_INVITATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListFailedInvitationsParams
          | (() => OrgsListFailedInvitationsParams | undefined),
      ) =>
        httpResource<OrgsListFailedInvitationsResponse>(() => ({
          url: `${base}/orgs/${org}/failed_invitations`,
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
