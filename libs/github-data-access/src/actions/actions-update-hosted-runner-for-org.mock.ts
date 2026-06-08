import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_UPDATE_HOSTED_RUNNER_FOR_ORG } from './actions-update-hosted-runner-for-org.token';
import type { ActionsUpdateHostedRunnerForOrgResponse } from './actions-update-hosted-runner-for-org.token';

export function provideActionsUpdateHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsUpdateHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_UPDATE_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_UPDATE_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
  );
}
