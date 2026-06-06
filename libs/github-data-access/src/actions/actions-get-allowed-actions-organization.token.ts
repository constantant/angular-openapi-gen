import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetAllowedActionsOrganizationResponse =
  paths['/orgs/{org}/actions/permissions/selected-actions']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ALLOWED_ACTIONS_ORGANIZATION = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetAllowedActionsOrganizationResponse>
  >
>('ACTIONS_GET_ALLOWED_ACTIONS_ORGANIZATION');

export function provideActionsGetAllowedActionsOrganization(): FactoryProvider {
  return {
    provide: ACTIONS_GET_ALLOWED_ACTIONS_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetAllowedActionsOrganizationResponse>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/selected-actions`,
        }));
    },
  };
}
