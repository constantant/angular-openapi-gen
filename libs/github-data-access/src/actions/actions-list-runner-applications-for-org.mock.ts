import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG } from './actions-list-runner-applications-for-org.token';
import type { ActionsListRunnerApplicationsForOrgResponse } from './actions-list-runner-applications-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-runner-applications-for-org',
  path: '/orgs/{org}/actions/runners/downloads',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListRunnerApplicationsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRunnerApplicationsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG,
    'ACTIONS_LIST_RUNNER_APPLICATIONS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
