import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG } from './actions-set-custom-labels-for-self-hosted-runner-for-org.token';
import type { ActionsSetCustomLabelsForSelfHostedRunnerForOrgResponse } from './actions-set-custom-labels-for-self-hosted-runner-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-custom-labels-for-self-hosted-runner-for-org',
  path: '/orgs/{org}/actions/runners/{runner_id}/labels',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetCustomLabelsForSelfHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsSetCustomLabelsForSelfHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_SET_CUSTOM_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
