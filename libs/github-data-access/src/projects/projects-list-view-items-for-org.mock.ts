import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_VIEW_ITEMS_FOR_ORG } from './projects-list-view-items-for-org.token';
import type { ProjectsListViewItemsForOrgResponse } from './projects-list-view-items-for-org.token';

export function provideProjectsListViewItemsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListViewItemsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_VIEW_ITEMS_FOR_ORG,
    'PROJECTS_LIST_VIEW_ITEMS_FOR_ORG',
    initialBehavior,
  );
}
