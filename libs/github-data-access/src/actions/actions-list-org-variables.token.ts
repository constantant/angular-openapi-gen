import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListOrgVariablesParams =
  paths['/orgs/{org}/actions/variables']['get']['parameters']['query'];

export type ActionsListOrgVariablesResponse =
  paths['/orgs/{org}/actions/variables']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_ORG_VARIABLES = new InjectionToken<
  (
    org: string,
    params?:
      | ActionsListOrgVariablesParams
      | (() => ActionsListOrgVariablesParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListOrgVariablesResponse>>
>('ACTIONS_LIST_ORG_VARIABLES');

export function provideActionsListOrgVariables(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_ORG_VARIABLES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | ActionsListOrgVariablesParams
          | (() => ActionsListOrgVariablesParams | undefined),
      ) =>
        httpResource<ActionsListOrgVariablesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/actions/variables`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
