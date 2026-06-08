import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_HOSTED_RUNNER_FOR_ORG } from './actions-create-hosted-runner-for-org.token';
import type { ActionsCreateHostedRunnerForOrgResponse } from './actions-create-hosted-runner-for-org.token';

export function provideActionsCreateHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_CREATE_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
  );
}
