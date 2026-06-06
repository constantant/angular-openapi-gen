import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsReviewPatGrantRequestBody = NonNullable<
  paths['/orgs/{org}/personal-access-token-requests/{pat_request_id}']['post']['requestBody']
>['content']['application/json'];

export const ORGS_REVIEW_PAT_GRANT_REQUEST = new InjectionToken<
  (
    org: string,
    patRequestId: string,
    body: OrgsReviewPatGrantRequestBody | Signal<OrgsReviewPatGrantRequestBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_REVIEW_PAT_GRANT_REQUEST', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      patRequestId: string,
      body:
        | OrgsReviewPatGrantRequestBody
        | Signal<OrgsReviewPatGrantRequestBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/personal-access-token-requests/${patRequestId}`,
        method: 'POST',
        body,
      }));
  },
});
