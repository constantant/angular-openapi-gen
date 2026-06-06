import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListPatGrantRequestRepositoriesParams =
  paths['/orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories']['get']['parameters']['query'];

export type OrgsListPatGrantRequestRepositoriesResponse =
  paths['/orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_PAT_GRANT_REQUEST_REPOSITORIES = new InjectionToken<
  (
    org: string,
    patRequestId: string,
    params?:
      | OrgsListPatGrantRequestRepositoriesParams
      | (() => OrgsListPatGrantRequestRepositoriesParams | undefined),
  ) => ReturnType<
    typeof httpResource<OrgsListPatGrantRequestRepositoriesResponse>
  >
>('ORGS_LIST_PAT_GRANT_REQUEST_REPOSITORIES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      patRequestId: string,
      params?:
        | OrgsListPatGrantRequestRepositoriesParams
        | (() => OrgsListPatGrantRequestRepositoriesParams | undefined),
    ) =>
      httpResource<OrgsListPatGrantRequestRepositoriesResponse>(() => ({
        url: `${base}/orgs/${org}/personal-access-token-requests/${patRequestId}/repositories`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
