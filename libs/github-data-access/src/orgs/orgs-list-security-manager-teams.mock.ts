import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_SECURITY_MANAGER_TEAMS } from './orgs-list-security-manager-teams.token';
import type { OrgsListSecurityManagerTeamsResponse } from './orgs-list-security-manager-teams.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-security-manager-teams',
  path: '/orgs/{org}/security-managers',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListSecurityManagerTeamsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListSecurityManagerTeamsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_SECURITY_MANAGER_TEAMS,
    'ORGS_LIST_SECURITY_MANAGER_TEAMS',
    initialBehavior,
    _meta,
  );
}
