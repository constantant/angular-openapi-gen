import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivityMarkRepoNotificationsAsReadBody = NonNullable<
  paths['/repos/{owner}/{repo}/notifications']['put']['requestBody']
>['content']['application/json'];

export const ACTIVITY_MARK_REPO_NOTIFICATIONS_AS_READ = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | ActivityMarkRepoNotificationsAsReadBody
      | Signal<ActivityMarkRepoNotificationsAsReadBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIVITY_MARK_REPO_NOTIFICATIONS_AS_READ');

export function provideActivityMarkRepoNotificationsAsRead(): FactoryProvider {
  return {
    provide: ACTIVITY_MARK_REPO_NOTIFICATIONS_AS_READ,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActivityMarkRepoNotificationsAsReadBody
          | Signal<ActivityMarkRepoNotificationsAsReadBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/notifications`,
          method: 'PUT',
          body,
        }));
    },
  };
}
