import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotRepositoryAccessForEnterpriseParams =
  paths['/enterprises/{enterprise}/dependabot/repository-access']['get']['parameters']['query'];

export type DependabotRepositoryAccessForEnterpriseResponse =
  paths['/enterprises/{enterprise}/dependabot/repository-access']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_REPOSITORY_ACCESS_FOR_ENTERPRISE = new InjectionToken<
  (
    enterprise: string,
    params?:
      | DependabotRepositoryAccessForEnterpriseParams
      | (() => DependabotRepositoryAccessForEnterpriseParams | undefined),
  ) => ReturnType<
    typeof httpResource<DependabotRepositoryAccessForEnterpriseResponse>
  >
>('DEPENDABOT_REPOSITORY_ACCESS_FOR_ENTERPRISE');

export function provideDependabotRepositoryAccessForEnterprise(): FactoryProvider {
  return {
    provide: DEPENDABOT_REPOSITORY_ACCESS_FOR_ENTERPRISE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        params?:
          | DependabotRepositoryAccessForEnterpriseParams
          | (() => DependabotRepositoryAccessForEnterpriseParams | undefined),
      ) =>
        httpResource<DependabotRepositoryAccessForEnterpriseResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/enterprises/${enterprise}/dependabot/repository-access`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
