import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REMOVE_SECURITY_MANAGER_TEAM } from './orgs-remove-security-manager-team.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/remove-security-manager-team',
  path: '/orgs/{org}/security-managers/teams/{team_slug}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsRemoveSecurityManagerTeamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REMOVE_SECURITY_MANAGER_TEAM,
    'ORGS_REMOVE_SECURITY_MANAGER_TEAM',
    initialBehavior,
    _meta,
  );
}
