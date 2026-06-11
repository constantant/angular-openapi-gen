import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_UPDATE_IN_ORG } from './teams-update-in-org.token';
import type { TeamsUpdateInOrgResponse } from './teams-update-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/update-in-org',
  path: '/orgs/{org}/teams/{team_slug}',
  method: 'patch',
  tag: 'teams',
};

export function provideTeamsUpdateInOrgMock(
  initialBehavior?: ProviderInitialBehavior<TeamsUpdateInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_UPDATE_IN_ORG,
    'TEAMS_UPDATE_IN_ORG',
    initialBehavior,
    _meta,
  );
}
