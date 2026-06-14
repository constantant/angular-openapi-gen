import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotListAlertsForEnterpriseParams =
  paths['/enterprises/{enterprise}/dependabot/alerts']['get']['parameters']['query'];

export type DependabotListAlertsForEnterpriseResponse =
  paths['/enterprises/{enterprise}/dependabot/alerts']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_LIST_ALERTS_FOR_ENTERPRISE = new InjectionToken<
  (
    enterprise: string,
    params?:
      | DependabotListAlertsForEnterpriseParams
      | (() => DependabotListAlertsForEnterpriseParams | undefined),
  ) => ReturnType<
    typeof httpResource<DependabotListAlertsForEnterpriseResponse>
  >
>('DEPENDABOT_LIST_ALERTS_FOR_ENTERPRISE');

export function provideDependabotListAlertsForEnterprise(): FactoryProvider {
  return {
    provide: DEPENDABOT_LIST_ALERTS_FOR_ENTERPRISE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        params?:
          | DependabotListAlertsForEnterpriseParams
          | (() => DependabotListAlertsForEnterpriseParams | undefined),
      ) =>
        httpResource<DependabotListAlertsForEnterpriseResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/enterprises/${enterprise}/dependabot/alerts`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
