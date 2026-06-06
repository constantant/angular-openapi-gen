import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateRegistrationTokenForOrgResponse =
  paths['/orgs/{org}/actions/runners/registration-token']['post']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<ActionsCreateRegistrationTokenForOrgResponse>
  >
>('ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<ActionsCreateRegistrationTokenForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/runners/registration-token`,
        method: 'POST',
      }));
  },
});
