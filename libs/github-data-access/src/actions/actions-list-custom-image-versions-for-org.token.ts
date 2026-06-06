import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListCustomImageVersionsForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_CUSTOM_IMAGE_VERSIONS_FOR_ORG = new InjectionToken<
  (
    imageDefinitionId: string,
    org: string,
  ) => ReturnType<
    typeof httpResource<ActionsListCustomImageVersionsForOrgResponse>
  >
>('ACTIONS_LIST_CUSTOM_IMAGE_VERSIONS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (imageDefinitionId: string, org: string) =>
      httpResource<ActionsListCustomImageVersionsForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/hosted-runners/images/custom/${imageDefinitionId}/versions`,
      }));
  },
});
