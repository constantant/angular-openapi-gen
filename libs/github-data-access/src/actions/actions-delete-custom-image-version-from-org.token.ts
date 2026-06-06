import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_CUSTOM_IMAGE_VERSION_FROM_ORG = new InjectionToken<
  (
    org: string,
    imageDefinitionId: string,
    version: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_CUSTOM_IMAGE_VERSION_FROM_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, imageDefinitionId: string, version: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/actions/hosted-runners/images/custom/${imageDefinitionId}/versions/${version}`,
        method: 'DELETE',
      }));
  },
});
