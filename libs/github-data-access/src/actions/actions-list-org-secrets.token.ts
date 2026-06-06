import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListOrgSecretsParams =
  paths['/orgs/{org}/actions/secrets']['get']['parameters']['query'];

export type ActionsListOrgSecretsResponse =
  paths['/orgs/{org}/actions/secrets']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_ORG_SECRETS = new InjectionToken<
  (
    org: string,
    params?:
      | ActionsListOrgSecretsParams
      | (() => ActionsListOrgSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListOrgSecretsResponse>>
>('ACTIONS_LIST_ORG_SECRETS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | ActionsListOrgSecretsParams
        | (() => ActionsListOrgSecretsParams | undefined),
    ) =>
      httpResource<ActionsListOrgSecretsResponse>(() => ({
        url: `${base}/orgs/${org}/actions/secrets`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
