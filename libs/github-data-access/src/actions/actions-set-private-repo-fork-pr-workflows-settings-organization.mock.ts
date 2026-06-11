import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION } from './actions-set-private-repo-fork-pr-workflows-settings-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'actions/set-private-repo-fork-pr-workflows-settings-organization',
  path: '/orgs/{org}/actions/permissions/fork-pr-workflows-private-repos',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetPrivateRepoForkPrWorkflowsSettingsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION,
    'ACTIONS_SET_PRIVATE_REPO_FORK_PR_WORKFLOWS_SETTINGS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
