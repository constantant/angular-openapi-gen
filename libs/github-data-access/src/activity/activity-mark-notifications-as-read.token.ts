import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityMarkNotificationsAsReadBody = NonNullable<
  paths['/notifications']['put']['requestBody']
>['content']['application/json'];

export const ACTIVITY_MARK_NOTIFICATIONS_AS_READ = new InjectionToken<
  (
    body:
      | ActivityMarkNotificationsAsReadBody
      | Signal<ActivityMarkNotificationsAsReadBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIVITY_MARK_NOTIFICATIONS_AS_READ', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      body:
        | ActivityMarkNotificationsAsReadBody
        | Signal<ActivityMarkNotificationsAsReadBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/notifications`,
        method: 'PUT',
        body,
      }));
  },
});
