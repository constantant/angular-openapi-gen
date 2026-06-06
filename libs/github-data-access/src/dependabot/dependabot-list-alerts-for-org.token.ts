import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotListAlertsForOrgParams =
  paths['/orgs/{org}/dependabot/alerts']['get']['parameters']['query'];

export type DependabotListAlertsForOrgResponse =
  paths['/orgs/{org}/dependabot/alerts']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_LIST_ALERTS_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | DependabotListAlertsForOrgParams
      | (() => DependabotListAlertsForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<DependabotListAlertsForOrgResponse>>
>('DEPENDABOT_LIST_ALERTS_FOR_ORG');

export function provideDependabotListAlertsForOrg(): FactoryProvider {
  return {
    provide: DEPENDABOT_LIST_ALERTS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | DependabotListAlertsForOrgParams
          | (() => DependabotListAlertsForOrgParams | undefined),
      ) =>
        httpResource<DependabotListAlertsForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/dependabot/alerts`,
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
