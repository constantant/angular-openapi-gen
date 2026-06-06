import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetCustomImageForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_CUSTOM_IMAGE_FOR_ORG = new InjectionToken<
  (
    org: string,
    imageDefinitionId: string,
  ) => ReturnType<typeof httpResource<ActionsGetCustomImageForOrgResponse>>
>('ACTIONS_GET_CUSTOM_IMAGE_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, imageDefinitionId: string) =>
      httpResource<ActionsGetCustomImageForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/hosted-runners/images/custom/${imageDefinitionId}`,
      }));
  },
});
