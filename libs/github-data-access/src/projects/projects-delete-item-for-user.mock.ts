import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_DELETE_ITEM_FOR_USER } from './projects-delete-item-for-user.token';

export function provideProjectsDeleteItemForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_DELETE_ITEM_FOR_USER,
    'PROJECTS_DELETE_ITEM_FOR_USER',
    initialBehavior,
  );
}
