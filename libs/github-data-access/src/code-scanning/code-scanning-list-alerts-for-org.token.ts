import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningListAlertsForOrgParams =
  paths['/orgs/{org}/code-scanning/alerts']['get']['parameters']['query'];

export type CodeScanningListAlertsForOrgResponse =
  paths['/orgs/{org}/code-scanning/alerts']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_LIST_ALERTS_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | CodeScanningListAlertsForOrgParams
      | (() => CodeScanningListAlertsForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<CodeScanningListAlertsForOrgResponse>>
>('CODE_SCANNING_LIST_ALERTS_FOR_ORG');

export function provideCodeScanningListAlertsForOrg(): FactoryProvider {
  return {
    provide: CODE_SCANNING_LIST_ALERTS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | CodeScanningListAlertsForOrgParams
          | (() => CodeScanningListAlertsForOrgParams | undefined),
      ) =>
        httpResource<CodeScanningListAlertsForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/code-scanning/alerts`,
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
