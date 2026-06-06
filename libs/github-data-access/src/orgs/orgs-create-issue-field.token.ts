import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCreateIssueFieldBody = NonNullable<
  paths['/orgs/{org}/issue-fields']['post']['requestBody']
>['content']['application/json'];

export type OrgsCreateIssueFieldResponse =
  paths['/orgs/{org}/issue-fields']['post']['responses']['200']['content']['application/json'];

export const ORGS_CREATE_ISSUE_FIELD = new InjectionToken<
  (
    org: string,
    body: OrgsCreateIssueFieldBody | Signal<OrgsCreateIssueFieldBody>,
  ) => ReturnType<typeof httpResource<OrgsCreateIssueFieldResponse>>
>('ORGS_CREATE_ISSUE_FIELD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body: OrgsCreateIssueFieldBody | Signal<OrgsCreateIssueFieldBody>,
    ) =>
      httpResource<OrgsCreateIssueFieldResponse>(() => ({
        url: `${base}/orgs/${org}/issue-fields`,
        method: 'POST',
        body,
      }));
  },
});
