import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListSelfHostedRunnersForOrgParams =
  paths['/orgs/{org}/actions/runners']['get']['parameters']['query'];

export type ActionsListSelfHostedRunnersForOrgResponse =
  paths['/orgs/{org}/actions/runners']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | ActionsListSelfHostedRunnersForOrgParams
      | (() => ActionsListSelfHostedRunnersForOrgParams | undefined),
  ) => ReturnType<
    typeof httpResource<ActionsListSelfHostedRunnersForOrgResponse>
  >
>('ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_ORG');

export function provideActionsListSelfHostedRunnersForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ActionsListSelfHostedRunnersForOrgParams
          | (() => ActionsListSelfHostedRunnersForOrgParams | undefined),
      ) =>
        httpResource<ActionsListSelfHostedRunnersForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/runners`,
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
