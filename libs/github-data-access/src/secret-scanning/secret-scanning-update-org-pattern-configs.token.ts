import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecretScanningUpdateOrgPatternConfigsBody = NonNullable<
  paths['/orgs/{org}/secret-scanning/pattern-configurations']['patch']['requestBody']
>['content']['application/json'];

export type SecretScanningUpdateOrgPatternConfigsResponse =
  paths['/orgs/{org}/secret-scanning/pattern-configurations']['patch']['responses']['200']['content']['application/json'];

export const SECRET_SCANNING_UPDATE_ORG_PATTERN_CONFIGS = new InjectionToken<
  (
    org: string,
    body:
      | SecretScanningUpdateOrgPatternConfigsBody
      | Signal<SecretScanningUpdateOrgPatternConfigsBody>,
  ) => ReturnType<
    typeof httpResource<SecretScanningUpdateOrgPatternConfigsResponse>
  >
>('SECRET_SCANNING_UPDATE_ORG_PATTERN_CONFIGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | SecretScanningUpdateOrgPatternConfigsBody
        | Signal<SecretScanningUpdateOrgPatternConfigsBody>,
    ) =>
      httpResource<SecretScanningUpdateOrgPatternConfigsResponse>(() => ({
        url: `${base}/orgs/${org}/secret-scanning/pattern-configurations`,
        method: 'PATCH',
        body,
      }));
  },
});
