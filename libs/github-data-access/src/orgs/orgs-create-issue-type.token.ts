import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCreateIssueTypeBody = NonNullable<
  paths['/orgs/{org}/issue-types']['post']['requestBody']
>['content']['application/json'];

export type OrgsCreateIssueTypeResponse =
  paths['/orgs/{org}/issue-types']['post']['responses']['200']['content']['application/json'];

export const ORGS_CREATE_ISSUE_TYPE = new InjectionToken<
  (
    org: string,
    body: OrgsCreateIssueTypeBody | Signal<OrgsCreateIssueTypeBody>,
  ) => ReturnType<typeof httpResource<OrgsCreateIssueTypeResponse>>
>('ORGS_CREATE_ISSUE_TYPE');

export function provideOrgsCreateIssueType(): FactoryProvider {
  return {
    provide: ORGS_CREATE_ISSUE_TYPE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body: OrgsCreateIssueTypeBody | Signal<OrgsCreateIssueTypeBody>,
      ) =>
        httpResource<OrgsCreateIssueTypeResponse>(() => ({
          url: `${base}/orgs/${org}/issue-types`,
          method: 'POST',
          body,
        }));
    },
  };
}
