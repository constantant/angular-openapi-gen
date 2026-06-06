import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListIssueTypesResponse =
  paths['/orgs/{org}/issue-types']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ISSUE_TYPES = new InjectionToken<
  (org: string) => ReturnType<typeof httpResource<OrgsListIssueTypesResponse>>
>('ORGS_LIST_ISSUE_TYPES');

export function provideOrgsListIssueTypes(): FactoryProvider {
  return {
    provide: ORGS_LIST_ISSUE_TYPES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<OrgsListIssueTypesResponse>(() => ({
          url: `${base}/orgs/${org}/issue-types`,
        }));
    },
  };
}
