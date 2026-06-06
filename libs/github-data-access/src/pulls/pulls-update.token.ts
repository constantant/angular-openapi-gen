import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsUpdateBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}']['patch']['requestBody']
>['content']['application/json'];

export type PullsUpdateResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}']['patch']['responses']['200']['content']['application/json'];

export const PULLS_UPDATE = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    body: PullsUpdateBody | Signal<PullsUpdateBody>,
  ) => ReturnType<typeof httpResource<PullsUpdateResponse>>
>('PULLS_UPDATE');

export function providePullsUpdate(): FactoryProvider {
  return {
    provide: PULLS_UPDATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        pullNumber: string,
        body: PullsUpdateBody | Signal<PullsUpdateBody>,
      ) =>
        httpResource<PullsUpdateResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
