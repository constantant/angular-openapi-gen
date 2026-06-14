import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_DELETE_ISSUE_TYPE = new InjectionToken<
  (org: string, issueTypeId: string) => ReturnType<typeof httpResource<unknown>>
>('ORGS_DELETE_ISSUE_TYPE');

export function provideOrgsDeleteIssueType(): FactoryProvider {
  return {
    provide: ORGS_DELETE_ISSUE_TYPE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, issueTypeId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/issue-types/${issueTypeId}`,
          method: 'DELETE',
        }));
    },
  };
}
