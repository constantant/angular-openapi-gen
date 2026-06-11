import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNERS_MACHINE_SPECS_FOR_ORG } from './actions-get-hosted-runners-machine-specs-for-org.token';
import type { ActionsGetHostedRunnersMachineSpecsForOrgResponse } from './actions-get-hosted-runners-machine-specs-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-hosted-runners-machine-specs-for-org',
  path: '/orgs/{org}/actions/hosted-runners/machine-sizes',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetHostedRunnersMachineSpecsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnersMachineSpecsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNERS_MACHINE_SPECS_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNERS_MACHINE_SPECS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
