import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_BLOCKED_USERS } from './orgs-list-blocked-users.token';
import type { OrgsListBlockedUsersResponse } from './orgs-list-blocked-users.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-blocked-users',
  path: '/orgs/{org}/blocks',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListBlockedUsersMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListBlockedUsersResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_BLOCKED_USERS,
    'ORGS_LIST_BLOCKED_USERS',
    initialBehavior,
    _meta,
  );
}
