import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotUpdateAlertBody = NonNullable<
  paths['/repos/{owner}/{repo}/dependabot/alerts/{alert_number}']['patch']['requestBody']
>['content']['application/json'];

export type DependabotUpdateAlertResponse =
  paths['/repos/{owner}/{repo}/dependabot/alerts/{alert_number}']['patch']['responses']['200']['content']['application/json'];

export const DEPENDABOT_UPDATE_ALERT = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
    body: DependabotUpdateAlertBody | Signal<DependabotUpdateAlertBody>,
  ) => ReturnType<typeof httpResource<DependabotUpdateAlertResponse>>
>('DEPENDABOT_UPDATE_ALERT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      alertNumber: string,
      body: DependabotUpdateAlertBody | Signal<DependabotUpdateAlertBody>,
    ) =>
      httpResource<DependabotUpdateAlertResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/dependabot/alerts/${alertNumber}`,
        method: 'PATCH',
        body,
      }));
  },
});
