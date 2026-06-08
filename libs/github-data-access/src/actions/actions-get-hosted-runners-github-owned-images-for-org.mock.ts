import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNERS_GITHUB_OWNED_IMAGES_FOR_ORG } from './actions-get-hosted-runners-github-owned-images-for-org.token';
import type { ActionsGetHostedRunnersGithubOwnedImagesForOrgResponse } from './actions-get-hosted-runners-github-owned-images-for-org.token';

export function provideActionsGetHostedRunnersGithubOwnedImagesForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnersGithubOwnedImagesForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNERS_GITHUB_OWNED_IMAGES_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNERS_GITHUB_OWNED_IMAGES_FOR_ORG',
    initialBehavior,
  );
}
