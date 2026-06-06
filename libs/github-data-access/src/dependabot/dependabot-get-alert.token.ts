import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotGetAlertResponse =
  paths['/repos/{owner}/{repo}/dependabot/alerts/{alert_number}']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_GET_ALERT = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
  ) => ReturnType<typeof httpResource<DependabotGetAlertResponse>>
>('DEPENDABOT_GET_ALERT');

export function provideDependabotGetAlert(): FactoryProvider {
  return {
    provide: DEPENDABOT_GET_ALERT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, alertNumber: string) =>
        httpResource<DependabotGetAlertResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/dependabot/alerts/${alertNumber}`,
        }));
    },
  };
}
