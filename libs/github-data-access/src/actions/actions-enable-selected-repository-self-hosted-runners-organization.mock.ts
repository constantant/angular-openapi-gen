import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_ENABLE_SELECTED_REPOSITORY_SELF_HOSTED_RUNNERS_ORGANIZATION } from './actions-enable-selected-repository-self-hosted-runners-organization.token';

export function provideActionsEnableSelectedRepositorySelfHostedRunnersOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ENABLE_SELECTED_REPOSITORY_SELF_HOSTED_RUNNERS_ORGANIZATION,
    'ACTIONS_ENABLE_SELECTED_REPOSITORY_SELF_HOSTED_RUNNERS_ORGANIZATION',
    initialBehavior,
  );
}
