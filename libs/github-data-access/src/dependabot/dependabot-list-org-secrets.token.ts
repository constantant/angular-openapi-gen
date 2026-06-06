import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotListOrgSecretsParams =
  paths['/orgs/{org}/dependabot/secrets']['get']['parameters']['query'];

export type DependabotListOrgSecretsResponse =
  paths['/orgs/{org}/dependabot/secrets']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_LIST_ORG_SECRETS = new InjectionToken<
  (
    org: string,
    params?:
      | DependabotListOrgSecretsParams
      | (() => DependabotListOrgSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<DependabotListOrgSecretsResponse>>
>('DEPENDABOT_LIST_ORG_SECRETS');

export function provideDependabotListOrgSecrets(): FactoryProvider {
  return {
    provide: DEPENDABOT_LIST_ORG_SECRETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | DependabotListOrgSecretsParams
          | (() => DependabotListOrgSecretsParams | undefined),
      ) =>
        httpResource<DependabotListOrgSecretsResponse>(() => ({
          url: `${base}/orgs/${org}/dependabot/secrets`,
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
