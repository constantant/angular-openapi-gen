import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_ENABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION } from './actions-enable-selected-repository-github-actions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/enable-selected-repository-github-actions-organization',
  path: '/orgs/{org}/actions/permissions/repositories/{repository_id}',
  method: 'put',
  tag: 'actions',
};

export function provideActionsEnableSelectedRepositoryGithubActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ENABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION,
    'ACTIONS_ENABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
