import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_ORG } from './actions-remove-all-custom-labels-from-self-hosted-runner-for-org.token';
import type { ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgResponse } from './actions-remove-all-custom-labels-from-self-hosted-runner-for-org.token';

export function provideActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_REMOVE_ALL_CUSTOM_LABELS_FROM_SELF_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
  );
}
