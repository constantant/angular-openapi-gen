import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DISABLE_SELECTED_REPOSITORY_SELF_HOSTED_RUNNERS_ORGANIZATION } from './actions-disable-selected-repository-self-hosted-runners-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/disable-selected-repository-self-hosted-runners-organization',
  path: '/orgs/{org}/actions/permissions/self-hosted-runners/repositories/{repository_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDisableSelectedRepositorySelfHostedRunnersOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DISABLE_SELECTED_REPOSITORY_SELF_HOSTED_RUNNERS_ORGANIZATION,
    'ACTIONS_DISABLE_SELECTED_REPOSITORY_SELF_HOSTED_RUNNERS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
