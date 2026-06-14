import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListIssueFieldsResponse =
  paths['/orgs/{org}/issue-fields']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ISSUE_FIELDS = new InjectionToken<
  (org: string) => ReturnType<typeof httpResource<OrgsListIssueFieldsResponse>>
>('ORGS_LIST_ISSUE_FIELDS');

export function provideOrgsListIssueFields(): FactoryProvider {
  return {
    provide: ORGS_LIST_ISSUE_FIELDS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<OrgsListIssueFieldsResponse>(() => ({
          url: `${base}/orgs/${org}/issue-fields`,
        }));
    },
  };
}
