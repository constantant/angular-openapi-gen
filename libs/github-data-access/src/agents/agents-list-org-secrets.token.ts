import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsListOrgSecretsParams =
  paths['/orgs/{org}/agents/secrets']['get']['parameters']['query'];

export type AgentsListOrgSecretsResponse =
  paths['/orgs/{org}/agents/secrets']['get']['responses']['200']['content']['application/json'];

export const AGENTS_LIST_ORG_SECRETS = new InjectionToken<
  (
    org: string,
    params?:
      | AgentsListOrgSecretsParams
      | (() => AgentsListOrgSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<AgentsListOrgSecretsResponse>>
>('AGENTS_LIST_ORG_SECRETS');

export function provideAgentsListOrgSecrets(): FactoryProvider {
  return {
    provide: AGENTS_LIST_ORG_SECRETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | AgentsListOrgSecretsParams
          | (() => AgentsListOrgSecretsParams | undefined),
      ) =>
        httpResource<AgentsListOrgSecretsResponse>(() => ({
          url: `${base}/orgs/${org}/agents/secrets`,
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
