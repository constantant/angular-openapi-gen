import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION } from './actions-get-self-hosted-runners-permissions-organization.token';
import type { ActionsGetSelfHostedRunnersPermissionsOrganizationResponse } from './actions-get-self-hosted-runners-permissions-organization.token';

export function provideActionsGetSelfHostedRunnersPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetSelfHostedRunnersPermissionsOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION,
    'ACTIONS_GET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION',
    initialBehavior,
  );
}
