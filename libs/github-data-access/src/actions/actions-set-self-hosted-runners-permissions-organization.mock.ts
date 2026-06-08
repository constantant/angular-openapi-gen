import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION } from './actions-set-self-hosted-runners-permissions-organization.token';

export function provideActionsSetSelfHostedRunnersPermissionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION,
    'ACTIONS_SET_SELF_HOSTED_RUNNERS_PERMISSIONS_ORGANIZATION',
    initialBehavior,
  );
}
