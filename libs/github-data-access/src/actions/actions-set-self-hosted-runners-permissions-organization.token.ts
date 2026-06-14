import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetSelfHostedRunnersPermissionsOrganizationBody =
  NonNullable<
    paths['/orgs/{org}/actions/permissions/self-hosted-runners']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetSelfHostedRunnersPermissionsOrganizationBody
        | Signal<ActionsSetSelfHostedRunnersPermissionsOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION');

export function provideActionsSetSelfHostedRunnersPermissionsOrganization(): FactoryProvider {
  return {
    provide: ACTIONS_SET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetSelfHostedRunnersPermissionsOrganizationBody
          | Signal<ActionsSetSelfHostedRunnersPermissionsOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/permissions/self-hosted-runners`,
          method: 'PUT',
          body,
        }));
    },
  };
}
