import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsCreateOrUpdateOrgSecretBody = NonNullable<
  paths['/orgs/{org}/actions/secrets/{secret_name}']['put']['requestBody']
>['content']['application/json'];

export type ActionsCreateOrUpdateOrgSecretResponse =
  paths['/orgs/{org}/actions/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const ACTIONS_CREATE_OR_UPDATE_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    body:
      | ActionsCreateOrUpdateOrgSecretBody
      | Signal<ActionsCreateOrUpdateOrgSecretBody>,
  ) => ReturnType<typeof httpResource<ActionsCreateOrUpdateOrgSecretResponse>>
>('ACTIONS_CREATE_OR_UPDATE_ORG_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      secretName: string,
      body:
        | ActionsCreateOrUpdateOrgSecretBody
        | Signal<ActionsCreateOrUpdateOrgSecretBody>,
    ) =>
      httpResource<ActionsCreateOrUpdateOrgSecretResponse>(() => ({
        url: `${base}/orgs/${org}/actions/secrets/${secretName}`,
        method: 'PUT',
        body,
      }));
  },
});
