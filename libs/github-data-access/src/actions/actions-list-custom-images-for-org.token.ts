import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListCustomImagesForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/images/custom']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_CUSTOM_IMAGES_FOR_ORG = new InjectionToken<
  (
    org: string,
  ) => ReturnType<typeof httpResource<ActionsListCustomImagesForOrgResponse>>
>('ACTIONS_LIST_CUSTOM_IMAGES_FOR_ORG');

export function provideActionsListCustomImagesForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_CUSTOM_IMAGES_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsListCustomImagesForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/hosted-runners/images/custom`,
        }));
    },
  };
}
