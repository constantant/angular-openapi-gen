import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CredentialsRevokeBody = NonNullable<
  paths['/credentials/revoke']['post']['requestBody']
>['content']['application/json'];

export const CREDENTIALS_REVOKE = new InjectionToken<
  (
    body: CredentialsRevokeBody | Signal<CredentialsRevokeBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('CREDENTIALS_REVOKE');

export function provideCredentialsRevoke(): FactoryProvider {
  return {
    provide: CREDENTIALS_REVOKE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (body: CredentialsRevokeBody | Signal<CredentialsRevokeBody>) =>
        httpResource<unknown>(() => ({
          url: `${base}/credentials/revoke`,
          method: 'POST',
          body,
        }));
    },
  };
}
