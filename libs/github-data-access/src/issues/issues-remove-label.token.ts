import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesRemoveLabelResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/labels/{name}']['delete']['responses']['200']['content']['application/json'];

export const ISSUES_REMOVE_LABEL = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    name: string,
  ) => ReturnType<typeof httpResource<IssuesRemoveLabelResponse>>
>('ISSUES_REMOVE_LABEL');

export function provideIssuesRemoveLabel(): FactoryProvider {
  return {
    provide: ISSUES_REMOVE_LABEL,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, issueNumber: string, name: string) =>
        httpResource<IssuesRemoveLabelResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/labels/${name}`,
          method: 'DELETE',
        }));
    },
  };
}
