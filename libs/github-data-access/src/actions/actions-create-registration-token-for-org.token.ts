import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG');

export function provideActionsCreateRegistrationTokenForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsCreateRegistrationTokenForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/runners/registration-token`,
          method: 'POST',
        }));
    },
  };
}
