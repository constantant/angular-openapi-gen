import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetHostedRunnersGithubOwnedImagesForOrgResponse =
  paths['/orgs/{org}/actions/hosted-runners/images/github-owned']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_HOSTED_RUNNERS_GITHUB_OWNED_IMAGES_FOR_ORG =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<ActionsGetHostedRunnersGithubOwnedImagesForOrgResponse>
    >
  >('ACTIONS_GET_HOSTED_RUNNERS_GITHUB_OWNED_IMAGES_FOR_ORG');

export function provideActionsGetHostedRunnersGithubOwnedImagesForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_GET_HOSTED_RUNNERS_GITHUB_OWNED_IMAGES_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<ActionsGetHostedRunnersGithubOwnedImagesForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/hosted-runners/images/github-owned`,
          }),
        );
    },
  };
}
