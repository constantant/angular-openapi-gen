import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { USERS_LIST } from './users-list.token';
import type { UsersListResponse } from './users-list.token';

export function provideUsersListMock(
  initialBehavior?: ProviderInitialBehavior<UsersListResponse>,
): FactoryProvider {
  return provideMockResource(USERS_LIST, 'USERS_LIST', initialBehavior);
}
