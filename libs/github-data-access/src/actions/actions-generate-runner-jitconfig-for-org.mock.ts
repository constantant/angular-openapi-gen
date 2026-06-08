import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_ORG } from './actions-generate-runner-jitconfig-for-org.token';
import type { ActionsGenerateRunnerJitconfigForOrgResponse } from './actions-generate-runner-jitconfig-for-org.token';

export function provideActionsGenerateRunnerJitconfigForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGenerateRunnerJitconfigForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_ORG,
    'ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_ORG',
    initialBehavior,
  );
}
