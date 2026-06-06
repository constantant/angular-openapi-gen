import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_DELETE_ISSUE_FIELD = new InjectionToken<
  (
    org: string,
    issueFieldId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_DELETE_ISSUE_FIELD');

export function provideOrgsDeleteIssueField(): FactoryProvider {
  return {
    provide: ORGS_DELETE_ISSUE_FIELD,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, issueFieldId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/issue-fields/${issueFieldId}`,
          method: 'DELETE',
        }));
    },
  };
}
