import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsReviewPatGrantRequestsInBulkBody = NonNullable<
  paths['/orgs/{org}/personal-access-token-requests']['post']['requestBody']
>['content']['application/json'];

export const ORGS_REVIEW_PAT_GRANT_REQUESTS_IN_BULK = new InjectionToken<
  (
    org: string,
    body:
      | OrgsReviewPatGrantRequestsInBulkBody
      | Signal<OrgsReviewPatGrantRequestsInBulkBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_REVIEW_PAT_GRANT_REQUESTS_IN_BULK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | OrgsReviewPatGrantRequestsInBulkBody
        | Signal<OrgsReviewPatGrantRequestsInBulkBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/personal-access-token-requests`,
        method: 'POST',
        body,
      }));
  },
});
