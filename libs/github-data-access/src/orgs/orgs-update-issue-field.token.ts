import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsUpdateIssueFieldBody = NonNullable<
  paths['/orgs/{org}/issue-fields/{issue_field_id}']['patch']['requestBody']
>['content']['application/json'];

export type OrgsUpdateIssueFieldResponse =
  paths['/orgs/{org}/issue-fields/{issue_field_id}']['patch']['responses']['200']['content']['application/json'];

export const ORGS_UPDATE_ISSUE_FIELD = new InjectionToken<
  (
    org: string,
    issueFieldId: string,
    body: OrgsUpdateIssueFieldBody | Signal<OrgsUpdateIssueFieldBody>,
  ) => ReturnType<typeof httpResource<OrgsUpdateIssueFieldResponse>>
>('ORGS_UPDATE_ISSUE_FIELD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      issueFieldId: string,
      body: OrgsUpdateIssueFieldBody | Signal<OrgsUpdateIssueFieldBody>,
    ) =>
      httpResource<OrgsUpdateIssueFieldResponse>(() => ({
        url: `${base}/orgs/${org}/issue-fields/${issueFieldId}`,
        method: 'PATCH',
        body,
      }));
  },
});
