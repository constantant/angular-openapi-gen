import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsCreateOrUpdateOrgSecretBody = NonNullable<
  paths['/orgs/{org}/agents/secrets/{secret_name}']['put']['requestBody']
>['content']['application/json'];

export type AgentsCreateOrUpdateOrgSecretResponse =
  paths['/orgs/{org}/agents/secrets/{secret_name}']['put']['responses']['201']['content']['application/json'];

export const AGENTS_CREATE_OR_UPDATE_ORG_SECRET = new InjectionToken<
  (
    org: string,
    secretName: string,
    body:
      | AgentsCreateOrUpdateOrgSecretBody
      | Signal<AgentsCreateOrUpdateOrgSecretBody>,
  ) => ReturnType<typeof httpResource<AgentsCreateOrUpdateOrgSecretResponse>>
>('AGENTS_CREATE_OR_UPDATE_ORG_SECRET');

export function provideAgentsCreateOrUpdateOrgSecret(): FactoryProvider {
  return {
    provide: AGENTS_CREATE_OR_UPDATE_ORG_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        secretName: string,
        body:
          | AgentsCreateOrUpdateOrgSecretBody
          | Signal<AgentsCreateOrUpdateOrgSecretBody>,
      ) =>
        httpResource<AgentsCreateOrUpdateOrgSecretResponse>(() => ({
          url: `${base}/orgs/${org}/agents/secrets/${secretName}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
