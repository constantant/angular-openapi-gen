import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNERS_PLATFORMS_FOR_ORG } from './actions-get-hosted-runners-platforms-for-org.token';
import type { ActionsGetHostedRunnersPlatformsForOrgResponse } from './actions-get-hosted-runners-platforms-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-hosted-runners-platforms-for-org',
  path: '/orgs/{org}/actions/hosted-runners/platforms',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetHostedRunnersPlatformsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnersPlatformsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNERS_PLATFORMS_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNERS_PLATFORMS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
