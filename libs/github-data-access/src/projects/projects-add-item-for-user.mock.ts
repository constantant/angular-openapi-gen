import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_ADD_ITEM_FOR_USER } from './projects-add-item-for-user.token';
import type { ProjectsAddItemForUserResponse } from './projects-add-item-for-user.token';

export function provideProjectsAddItemForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsAddItemForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_ADD_ITEM_FOR_USER,
    'PROJECTS_ADD_ITEM_FOR_USER',
    initialBehavior,
  );
}
