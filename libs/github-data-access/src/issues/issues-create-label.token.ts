import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesCreateLabelBody = NonNullable<
  paths['/repos/{owner}/{repo}/labels']['post']['requestBody']
>['content']['application/json'];

export type IssuesCreateLabelResponse =
  paths['/repos/{owner}/{repo}/labels']['post']['responses']['201']['content']['application/json'];

export const ISSUES_CREATE_LABEL = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: IssuesCreateLabelBody | Signal<IssuesCreateLabelBody>,
  ) => ReturnType<typeof httpResource<IssuesCreateLabelResponse>>
>('ISSUES_CREATE_LABEL');

export function provideIssuesCreateLabel(): FactoryProvider {
  return {
    provide: ISSUES_CREATE_LABEL,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: IssuesCreateLabelBody | Signal<IssuesCreateLabelBody>,
      ) =>
        httpResource<IssuesCreateLabelResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/labels`,
          method: 'POST',
          body,
        }));
    },
  };
}
