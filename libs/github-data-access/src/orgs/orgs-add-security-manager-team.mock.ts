import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_ADD_SECURITY_MANAGER_TEAM } from './orgs-add-security-manager-team.token';

export function provideOrgsAddSecurityManagerTeamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_ADD_SECURITY_MANAGER_TEAM,
    'ORGS_ADD_SECURITY_MANAGER_TEAM',
    initialBehavior,
  );
}
