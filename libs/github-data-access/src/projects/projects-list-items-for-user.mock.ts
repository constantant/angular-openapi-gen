import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_ITEMS_FOR_USER } from './projects-list-items-for-user.token';
import type { ProjectsListItemsForUserResponse } from './projects-list-items-for-user.token';

export function provideProjectsListItemsForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListItemsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_ITEMS_FOR_USER,
    'PROJECTS_LIST_ITEMS_FOR_USER',
    initialBehavior,
  );
}
