import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetCustomImageVersionForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_CUSTOM_IMAGE_VERSION_FOR_ORG = new InjectionToken<
  (
    org: string,
    imageDefinitionId: string,
    version: string,
  ) => ReturnType<
    typeof httpResource<ActionsGetCustomImageVersionForOrgResponse>
  >
>('ACTIONS_GET_CUSTOM_IMAGE_VERSION_FOR_ORG');

export function provideActionsGetCustomImageVersionForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_GET_CUSTOM_IMAGE_VERSION_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, imageDefinitionId: string, version: string) =>
        httpResource<ActionsGetCustomImageVersionForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/hosted-runners/images/custom/${imageDefinitionId}/versions/${version}`,
        }));
    },
  };
}
