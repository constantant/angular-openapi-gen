import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNERS_MACHINE_SPECS_FOR_ORG } from './actions-get-hosted-runners-machine-specs-for-org.token';
import type { ActionsGetHostedRunnersMachineSpecsForOrgResponse } from './actions-get-hosted-runners-machine-specs-for-org.token';

export function provideActionsGetHostedRunnersMachineSpecsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnersMachineSpecsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNERS_MACHINE_SPECS_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNERS_MACHINE_SPECS_FOR_ORG',
    initialBehavior,
  );
}
