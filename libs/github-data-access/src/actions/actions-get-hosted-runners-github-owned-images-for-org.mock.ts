import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNERS_GITHUB_OWNED_IMAGES_FOR_ORG } from './actions-get-hosted-runners-github-owned-images-for-org.token';
import type { ActionsGetHostedRunnersGithubOwnedImagesForOrgResponse } from './actions-get-hosted-runners-github-owned-images-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-hosted-runners-github-owned-images-for-org',
  path: '/orgs/{org}/actions/hosted-runners/images/github-owned',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetHostedRunnersGithubOwnedImagesForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnersGithubOwnedImagesForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNERS_GITHUB_OWNED_IMAGES_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNERS_GITHUB_OWNED_IMAGES_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
