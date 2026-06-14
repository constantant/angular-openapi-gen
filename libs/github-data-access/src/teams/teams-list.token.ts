import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListParams =
  paths['/orgs/{org}/teams']['get']['parameters']['query'];

export type TeamsListResponse =
  paths['/orgs/{org}/teams']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST = new InjectionToken<
  (
    org: string,
    params?: TeamsListParams | (() => TeamsListParams | undefined),
  ) => ReturnType<typeof httpResource<TeamsListResponse>>
>('TEAMS_LIST');

export function provideTeamsList(): FactoryProvider {
  return {
    provide: TEAMS_LIST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?: TeamsListParams | (() => TeamsListParams | undefined),
      ) =>
        httpResource<TeamsListResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/teams`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
