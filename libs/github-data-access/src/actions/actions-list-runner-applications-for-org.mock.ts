import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG } from './actions-list-runner-applications-for-org.token';
import type { ActionsListRunnerApplicationsForOrgResponse } from './actions-list-runner-applications-for-org.token';

export function provideActionsListRunnerApplicationsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRunnerApplicationsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG,
    'ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG',
    initialBehavior,
  );
}
