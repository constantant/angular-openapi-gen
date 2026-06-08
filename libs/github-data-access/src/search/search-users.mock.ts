import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { SEARCH_USERS } from './search-users.token';
import type { SearchUsersResponse } from './search-users.token';

export function provideSearchUsersMock(
  initialBehavior?: ProviderInitialBehavior<SearchUsersResponse>,
): FactoryProvider {
  return provideMockResource(SEARCH_USERS, 'SEARCH_USERS', initialBehavior);
}
