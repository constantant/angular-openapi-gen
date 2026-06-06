import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetSelfHostedRunnersPermissionsOrganizationResponse =
  paths['/orgs/{org}/actions/permissions/self-hosted-runners']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetSelfHostedRunnersPermissionsOrganizationResponse>
    >
  >('ACTIONS_GET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetSelfHostedRunnersPermissionsOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/permissions/self-hosted-runners`,
          }),
        );
    },
  });
