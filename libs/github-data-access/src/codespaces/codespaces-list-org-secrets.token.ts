import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesListOrgSecretsParams =
  paths['/orgs/{org}/codespaces/secrets']['get']['parameters']['query'];

export type CodespacesListOrgSecretsResponse =
  paths['/orgs/{org}/codespaces/secrets']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_LIST_ORG_SECRETS = new InjectionToken<
  (
    org: string,
    params?:
      | CodespacesListOrgSecretsParams
      | (() => CodespacesListOrgSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<CodespacesListOrgSecretsResponse>>
>('CODESPACES_LIST_ORG_SECRETS');

export function provideCodespacesListOrgSecrets(): FactoryProvider {
  return {
    provide: CODESPACES_LIST_ORG_SECRETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | CodespacesListOrgSecretsParams
          | (() => CodespacesListOrgSecretsParams | undefined),
      ) =>
        httpResource<CodespacesListOrgSecretsResponse>(() => ({
          url: `${base}/orgs/${org}/codespaces/secrets`,
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
