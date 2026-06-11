import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION } from './actions-set-selected-repositories-self-hosted-runners-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/set-selected-repositories-self-hosted-runners-organization',
  path: '/orgs/{org}/actions/permissions/self-hosted-runners/repositories',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetSelectedRepositoriesSelfHostedRunnersOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION,
    'ACTIONS_SET_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
