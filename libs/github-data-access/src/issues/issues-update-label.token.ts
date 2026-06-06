import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesUpdateLabelBody = NonNullable<
  paths['/repos/{owner}/{repo}/labels/{name}']['patch']['requestBody']
>['content']['application/json'];

export type IssuesUpdateLabelResponse =
  paths['/repos/{owner}/{repo}/labels/{name}']['patch']['responses']['200']['content']['application/json'];

export const ISSUES_UPDATE_LABEL = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
    body: IssuesUpdateLabelBody | Signal<IssuesUpdateLabelBody>,
  ) => ReturnType<typeof httpResource<IssuesUpdateLabelResponse>>
>('ISSUES_UPDATE_LABEL');

export function provideIssuesUpdateLabel(): FactoryProvider {
  return {
    provide: ISSUES_UPDATE_LABEL,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        name: string,
        body: IssuesUpdateLabelBody | Signal<IssuesUpdateLabelBody>,
      ) =>
        httpResource<IssuesUpdateLabelResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/labels/${name}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
