import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksSetSuitesPreferencesBody = NonNullable<
  paths['/repos/{owner}/{repo}/check-suites/preferences']['patch']['requestBody']
>['content']['application/json'];

export type ChecksSetSuitesPreferencesResponse =
  paths['/repos/{owner}/{repo}/check-suites/preferences']['patch']['responses']['200']['content']['application/json'];

export const CHECKS_SET_SUITES_PREFERENCES = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | ChecksSetSuitesPreferencesBody
      | Signal<ChecksSetSuitesPreferencesBody>,
  ) => ReturnType<typeof httpResource<ChecksSetSuitesPreferencesResponse>>
>('CHECKS_SET_SUITES_PREFERENCES');

export function provideChecksSetSuitesPreferences(): FactoryProvider {
  return {
    provide: CHECKS_SET_SUITES_PREFERENCES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ChecksSetSuitesPreferencesBody
          | Signal<ChecksSetSuitesPreferencesBody>,
      ) =>
        httpResource<ChecksSetSuitesPreferencesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/check-suites/preferences`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
