import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListHostedRunnersForOrgParams =
  paths['/orgs/{org}/actions/hosted-runners']['get']['parameters']['query'];

export type ActionsListHostedRunnersForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_HOSTED_RUNNERS_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | ActionsListHostedRunnersForOrgParams
      | (() => ActionsListHostedRunnersForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListHostedRunnersForOrgResponse>>
>('ACTIONS_LIST_HOSTED_RUNNERS_FOR_ORG');

export function provideActionsListHostedRunnersForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_HOSTED_RUNNERS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ActionsListHostedRunnersForOrgParams
          | (() => ActionsListHostedRunnersForOrgParams | undefined),
      ) =>
        httpResource<ActionsListHostedRunnersForOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/actions/hosted-runners`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
