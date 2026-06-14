import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesCreateOrUpdateOrgSecretBody = NonNullable<
  paths['/orgs/{org}/codespaces/secrets/{secret_name}']['put']['requestBody']
>['content']['application/json'];

export type CodespacesCreateOrUpdateOrgSecretResponse =
  paths['/orgs/{org}/codespaces/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const CODESPACES_CREATE_OR_UPDATE_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    body:
      | CodespacesCreateOrUpdateOrgSecretBody
      | Signal<CodespacesCreateOrUpdateOrgSecretBody>,
  ) => ReturnType<
    typeof httpResource<CodespacesCreateOrUpdateOrgSecretResponse>
  >
>('CODESPACES_CREATE_OR_UPDATE_ORG_SECRET');

export function provideCodespacesCreateOrUpdateOrgSecret(): FactoryProvider {
  return {
    provide: CODESPACES_CREATE_OR_UPDATE_ORG_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        secretName: string,
        body:
          | CodespacesCreateOrUpdateOrgSecretBody
          | Signal<CodespacesCreateOrUpdateOrgSecretBody>,
      ) =>
        httpResource<CodespacesCreateOrUpdateOrgSecretResponse>(() => ({
          url: `${base}/orgs/${org}/codespaces/secrets/${secretName}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
