import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG } from './actions-list-labels-for-self-hosted-runner-for-org.token';
import type { ActionsListLabelsForSelfHostedRunnerForOrgResponse } from './actions-list-labels-for-self-hosted-runner-for-org.token';

export function provideActionsListLabelsForSelfHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListLabelsForSelfHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_LIST_LABELS_FOR_SELF_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
  );
}
