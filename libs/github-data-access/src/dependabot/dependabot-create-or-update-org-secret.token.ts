import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotCreateOrUpdateOrgSecretBody = NonNullable<
  paths['/orgs/{org}/dependabot/secrets/{secret_name}']['put']['requestBody']
>['content']['application/json'];

export type DependabotCreateOrUpdateOrgSecretResponse =
  paths['/orgs/{org}/dependabot/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const DEPENDABOT_CREATE_OR_UPDATE_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    body:
      | DependabotCreateOrUpdateOrgSecretBody
      | Signal<DependabotCreateOrUpdateOrgSecretBody>,
  ) => ReturnType<
    typeof httpResource<DependabotCreateOrUpdateOrgSecretResponse>
  >
>('DEPENDABOT_CREATE_OR_UPDATE_ORG_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      secretName: string,
      body:
        | DependabotCreateOrUpdateOrgSecretBody
        | Signal<DependabotCreateOrUpdateOrgSecretBody>,
    ) =>
      httpResource<DependabotCreateOrUpdateOrgSecretResponse>(() => ({
        url: `${base}/orgs/${org}/dependabot/secrets/${secretName}`,
        method: 'PUT',
        body,
      }));
  },
});
