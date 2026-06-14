import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecretScanningListAlertsForOrgParams =
  paths['/orgs/{org}/secret-scanning/alerts']['get']['parameters']['query'];

export type SecretScanningListAlertsForOrgResponse =
  paths['/orgs/{org}/secret-scanning/alerts']['get']['responses']['200']['content']['application/json'];

export const SECRET_SCANNING_LIST_ALERTS_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | SecretScanningListAlertsForOrgParams
      | (() => SecretScanningListAlertsForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<SecretScanningListAlertsForOrgResponse>>
>('SECRET_SCANNING_LIST_ALERTS_FOR_ORG');

export function provideSecretScanningListAlertsForOrg(): FactoryProvider {
  return {
    provide: SECRET_SCANNING_LIST_ALERTS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | SecretScanningListAlertsForOrgParams
          | (() => SecretScanningListAlertsForOrgParams | undefined),
      ) =>
        httpResource<SecretScanningListAlertsForOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/secret-scanning/alerts`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
