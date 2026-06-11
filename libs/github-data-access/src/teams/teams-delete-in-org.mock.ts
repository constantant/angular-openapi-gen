import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { TEAMS_DELETE_IN_ORG } from './teams-delete-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'teams/delete-in-org',
  path: '/orgs/{org}/teams/{team_slug}',
  method: 'delete',
  tag: 'teams',
};

export function provideTeamsDeleteInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    TEAMS_DELETE_IN_ORG,
    'TEAMS_DELETE_IN_ORG',
    initialBehavior,
    _meta,
  );
}
