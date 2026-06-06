import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_CANCEL_INVITATION = new InjectionToken<
  (
    org: string,
    invitationId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_CANCEL_INVITATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, invitationId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/invitations/${invitationId}`,
        method: 'DELETE',
      }));
  },
});
