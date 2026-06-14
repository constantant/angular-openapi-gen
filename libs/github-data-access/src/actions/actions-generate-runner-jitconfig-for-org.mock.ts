import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_ORG } from './actions-generate-runner-jitconfig-for-org.token';
import type { ActionsGenerateRunnerJitconfigForOrgResponse } from './actions-generate-runner-jitconfig-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/generate-runner-jitconfig-for-org',
  path: '/orgs/{org}/actions/runners/generate-jitconfig',
  method: 'post',
  tag: 'actions',
};

export function provideActionsGenerateRunnerJitconfigForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGenerateRunnerJitconfigForOrgResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_ORG,
    'ACTIONS_GENERATE_RUNNER_JITCONFIG_FOR_ORG',
    initialBehavior,
    _meta,
    options,
  );
}
