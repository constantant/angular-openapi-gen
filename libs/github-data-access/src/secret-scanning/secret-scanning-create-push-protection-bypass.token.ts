import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecretScanningCreatePushProtectionBypassBody = NonNullable<
  paths['/repos/{owner}/{repo}/secret-scanning/push-protection-bypasses']['post']['requestBody']
>['content']['application/json'];

export type SecretScanningCreatePushProtectionBypassResponse =
  paths['/repos/{owner}/{repo}/secret-scanning/push-protection-bypasses']['post']['responses']['200']['content']['application/json'];

export const SECRET_SCANNING_CREATE_PUSH_PROTECTION_BYPASS = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | SecretScanningCreatePushProtectionBypassBody
      | Signal<SecretScanningCreatePushProtectionBypassBody>,
  ) => ReturnType<
    typeof httpResource<SecretScanningCreatePushProtectionBypassResponse>
  >
>('SECRET_SCANNING_CREATE_PUSH_PROTECTION_BYPASS');

export function provideSecretScanningCreatePushProtectionBypass(): FactoryProvider {
  return {
    provide: SECRET_SCANNING_CREATE_PUSH_PROTECTION_BYPASS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | SecretScanningCreatePushProtectionBypassBody
          | Signal<SecretScanningCreatePushProtectionBypassBody>,
      ) =>
        httpResource<SecretScanningCreatePushProtectionBypassResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/secret-scanning/push-protection-bypasses`,
          method: 'POST',
          body,
        }));
    },
  };
}
