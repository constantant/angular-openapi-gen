import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_ORG } from './actions-add-custom-labels-to-self-hosted-runner-for-org.token';
import type { ActionsAddCustomLabelsToSelfHostedRunnerForOrgResponse } from './actions-add-custom-labels-to-self-hosted-runner-for-org.token';

export function provideActionsAddCustomLabelsToSelfHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsAddCustomLabelsToSelfHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_ADD_CUSTOM_LABELS_TO_SELF_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
  );
}
