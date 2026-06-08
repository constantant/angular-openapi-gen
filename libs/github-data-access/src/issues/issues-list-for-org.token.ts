import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListForOrgParams =
  paths['/orgs/{org}/issues']['get']['parameters']['query'];

export type IssuesListForOrgResponse =
  paths['/orgs/{org}/issues']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | IssuesListForOrgParams
      | (() => IssuesListForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListForOrgResponse>>
>('ISSUES_LIST_FOR_ORG');

export function provideIssuesListForOrg(): FactoryProvider {
  return {
    provide: ISSUES_LIST_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | IssuesListForOrgParams
          | (() => IssuesListForOrgParams | undefined),
      ) =>
        httpResource<IssuesListForOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/issues`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
