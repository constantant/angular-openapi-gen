import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActivitySetRepoSubscriptionBody = NonNullable<
  paths['/repos/{owner}/{repo}/subscription']['put']['requestBody']
>['content']['application/json'];

export type ActivitySetRepoSubscriptionResponse =
  paths['/repos/{owner}/{repo}/subscription']['put']['responses']['200']['content']['application/json'];

export const ACTIVITY_SET_REPO_SUBSCRIPTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | ActivitySetRepoSubscriptionBody
      | Signal<ActivitySetRepoSubscriptionBody>,
  ) => ReturnType<typeof httpResource<ActivitySetRepoSubscriptionResponse>>
>('ACTIVITY_SET_REPO_SUBSCRIPTION');

export function provideActivitySetRepoSubscription(): FactoryProvider {
  return {
    provide: ACTIVITY_SET_REPO_SUBSCRIPTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActivitySetRepoSubscriptionBody
          | Signal<ActivitySetRepoSubscriptionBody>,
      ) =>
        httpResource<ActivitySetRepoSubscriptionResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/subscription`,
          method: 'PUT',
          body,
        }));
    },
  };
}
