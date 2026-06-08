import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION } from './actions-list-selected-repositories-self-hosted-runners-organization.token';
import type { ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationResponse } from './actions-list-selected-repositories-self-hosted-runners-organization.token';

export function provideActionsListSelectedRepositoriesSelfHostedRunnersOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelectedRepositoriesSelfHostedRunnersOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION,
    'ACTIONS_LIST_SELECTED_REPOSITORIES_SELF_HOSTED_RUNNERS_ORGANIZATION',
    initialBehavior,
  );
}
