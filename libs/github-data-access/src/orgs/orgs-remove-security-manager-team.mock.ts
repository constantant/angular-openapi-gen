import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REMOVE_SECURITY_MANAGER_TEAM } from './orgs-remove-security-manager-team.token';

export function provideOrgsRemoveSecurityManagerTeamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REMOVE_SECURITY_MANAGER_TEAM,
    'ORGS_REMOVE_SECURITY_MANAGER_TEAM',
    initialBehavior,
  );
}
