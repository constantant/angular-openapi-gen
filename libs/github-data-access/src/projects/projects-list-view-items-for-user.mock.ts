import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_VIEW_ITEMS_FOR_USER } from './projects-list-view-items-for-user.token';
import type { ProjectsListViewItemsForUserResponse } from './projects-list-view-items-for-user.token';

export function provideProjectsListViewItemsForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListViewItemsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_VIEW_ITEMS_FOR_USER,
    'PROJECTS_LIST_VIEW_ITEMS_FOR_USER',
    initialBehavior,
  );
}
