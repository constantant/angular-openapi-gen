import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION } from './actions-set-selected-repositories-enabled-github-actions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/set-selected-repositories-enabled-github-actions-organization',
  path: '/orgs/{org}/actions/permissions/repositories',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetSelectedRepositoriesEnabledGithubActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION,
    'ACTIONS_SET_SELECTED_REPOSITORIES_ENABLED_GITHUB_ACTIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
