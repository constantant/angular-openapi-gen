import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_ORG } from './actions-remove-custom-label-from-self-hosted-runner-for-org.token';
import type { ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgResponse } from './actions-remove-custom-label-from-self-hosted-runner-for-org.token';

export function provideActionsRemoveCustomLabelFromSelfHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsRemoveCustomLabelFromSelfHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_REMOVE_CUSTOM_LABEL_FROM_SELF_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
  );
}
