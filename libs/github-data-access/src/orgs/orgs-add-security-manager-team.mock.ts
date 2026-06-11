import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_ADD_SECURITY_MANAGER_TEAM } from './orgs-add-security-manager-team.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/add-security-manager-team',
  path: '/orgs/{org}/security-managers/teams/{team_slug}',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsAddSecurityManagerTeamMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_ADD_SECURITY_MANAGER_TEAM,
    'ORGS_ADD_SECURITY_MANAGER_TEAM',
    initialBehavior,
    _meta,
  );
}
