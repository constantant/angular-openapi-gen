import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_ORG } from './actions-remove-custom-label-from-self-hosted-runner-for-org.token';
import type { ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgResponse } from './actions-remove-custom-label-from-self-hosted-runner-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/remove-custom-label-from-self-hosted-runner-for-org',
  path: '/orgs/{org}/actions/runners/{runner_id}/labels/{name}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsRemoveCustomLabelFromSelfHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
