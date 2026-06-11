import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DISABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION } from './actions-disable-selected-repository-github-actions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/disable-selected-repository-github-actions-organization',
  path: '/orgs/{org}/actions/permissions/repositories/{repository_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDisableSelectedRepositoryGithubActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DISABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION,
    'ACTIONS_DISABLE_SELECTED_REPOSITORY_GITHUB_ACTIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
