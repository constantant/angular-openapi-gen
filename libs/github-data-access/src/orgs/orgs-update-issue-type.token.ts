import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsUpdateIssueTypeBody = NonNullable<
  paths['/orgs/{org}/issue-types/{issue_type_id}']['put']['requestBody']
>['content']['application/json'];

export type OrgsUpdateIssueTypeResponse =
  paths['/orgs/{org}/issue-types/{issue_type_id}']['put']['responses']['200']['content']['application/json'];

export const ORGS_UPDATE_ISSUE_TYPE = new InjectionToken<
  (
    org: string,
    issueTypeId: string,
    body: OrgsUpdateIssueTypeBody | Signal<OrgsUpdateIssueTypeBody>,
  ) => ReturnType<typeof httpResource<OrgsUpdateIssueTypeResponse>>
>('ORGS_UPDATE_ISSUE_TYPE');

export function provideOrgsUpdateIssueType(): FactoryProvider {
  return {
    provide: ORGS_UPDATE_ISSUE_TYPE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        issueTypeId: string,
        body: OrgsUpdateIssueTypeBody | Signal<OrgsUpdateIssueTypeBody>,
      ) =>
        httpResource<OrgsUpdateIssueTypeResponse>(() => ({
          url: `${base}/orgs/${org}/issue-types/${issueTypeId}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
