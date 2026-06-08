import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamsListParams =
  paths['/enterprises/{enterprise}/teams']['get']['parameters']['query'];

export type EnterpriseTeamsListResponse =
  paths['/enterprises/{enterprise}/teams']['get']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAMS_LIST = new InjectionToken<
  (
    enterprise: string,
    params?:
      | EnterpriseTeamsListParams
      | (() => EnterpriseTeamsListParams | undefined),
  ) => ReturnType<typeof httpResource<EnterpriseTeamsListResponse>>
>('ENTERPRISE_TEAMS_LIST');

export function provideEnterpriseTeamsList(): FactoryProvider {
  return {
    provide: ENTERPRISE_TEAMS_LIST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        params?:
          | EnterpriseTeamsListParams
          | (() => EnterpriseTeamsListParams | undefined),
      ) =>
        httpResource<EnterpriseTeamsListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/enterprises/${enterprise}/teams`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
