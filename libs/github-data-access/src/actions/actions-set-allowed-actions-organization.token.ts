import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetAllowedActionsOrganizationBody = NonNullable<
  paths['/orgs/{org}/actions/permissions/selected-actions']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_ALLOWED_ACTIONS_ORGANIZATION = new InjectionToken<
  (
    org: string,
    body:
      | ActionsSetAllowedActionsOrganizationBody
      | Signal<ActionsSetAllowedActionsOrganizationBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_SET_ALLOWED_ACTIONS_ORGANIZATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | ActionsSetAllowedActionsOrganizationBody
        | Signal<ActionsSetAllowedActionsOrganizationBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/actions/permissions/selected-actions`,
        method: 'PUT',
        body,
      }));
  },
});
