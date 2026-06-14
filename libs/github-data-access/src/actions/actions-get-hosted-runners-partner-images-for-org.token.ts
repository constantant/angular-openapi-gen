import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetHostedRunnersPartnerImagesForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/images/partner']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_HOSTED_RUNNERS_PARTNER_IMAGES_FOR_ORG =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetHostedRunnersPartnerImagesForOrgResponse>
    >
  >('ACTIONS_GET_HOSTED_RUNNERS_PARTNER_IMAGES_FOR_ORG');

export function provideActionsGetHostedRunnersPartnerImagesForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_GET_HOSTED_RUNNERS_PARTNER_IMAGES_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetHostedRunnersPartnerImagesForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/hosted-runners/images/partner`,
          }),
        );
    },
  };
}
