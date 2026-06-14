import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ISSUES_DELETE_ISSUE_FIELD_VALUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    issueFieldId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ISSUES_DELETE_ISSUE_FIELD_VALUE');

export function provideIssuesDeleteIssueFieldValue(): FactoryProvider {
  return {
    provide: ISSUES_DELETE_ISSUE_FIELD_VALUE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        issueFieldId: string,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/issue-field-values/${issueFieldId}`,
          method: 'DELETE',
        }));
    },
  };
}
