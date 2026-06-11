import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION } from './actions-list-selected-repositories-enabled-github-actions-organization.token';
import type { ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationResponse } from './actions-list-selected-repositories-enabled-github-actions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/list-selected-repositories-enabled-github-actions-organization',
  path: '/orgs/{org}/actions/permissions/repositories',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListSelectedRepositoriesEnabledGithubActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelectedRepositoriesEnabledGithubActionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION,
    'ACTIONS_LIST_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
