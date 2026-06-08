import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNERS_PLATFORMS_FOR_ORG } from './actions-get-hosted-runners-platforms-for-org.token';
import type { ActionsGetHostedRunnersPlatformsForOrgResponse } from './actions-get-hosted-runners-platforms-for-org.token';

export function provideActionsGetHostedRunnersPlatformsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnersPlatformsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNERS_PLATFORMS_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNERS_PLATFORMS_FOR_ORG',
    initialBehavior,
  );
}
