import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SEARCH_USERS } from './search-users.token';
import type { SearchUsersResponse } from './search-users.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'search/users',
  path: '/search/users',
  method: 'get',
  tag: 'search',
};

export function provideSearchUsersMock(
  initialBehavior?: ProviderInitialBehavior<SearchUsersResponse>,
): FactoryProvider {
  return provideMockResource(
    SEARCH_USERS,
    'SEARCH_USERS',
    initialBehavior,
    _meta,
  );
}
