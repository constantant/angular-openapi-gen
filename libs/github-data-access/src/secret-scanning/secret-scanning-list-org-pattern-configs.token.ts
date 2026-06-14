import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecretScanningListOrgPatternConfigsResponse =
  paths['/orgs/{org}/secret-scanning/pattern-configurations']['get']['responses']['200']['content']['application/json'];

export const SECRET_SCANNING_LIST_ORG_PATTERN_CONFIGS = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<SecretScanningListOrgPatternConfigsResponse>
  >
>('SECRET_SCANNING_LIST_ORG_PATTERN_CONFIGS');

export function provideSecretScanningListOrgPatternConfigs(): FactoryProvider {
  return {
    provide: SECRET_SCANNING_LIST_ORG_PATTERN_CONFIGS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<SecretScanningListOrgPatternConfigsResponse>(() => ({
          url: `${base}/orgs/${org}/secret-scanning/pattern-configurations`,
        }));
    },
  };
}
