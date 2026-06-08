import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_ITEMS_FOR_ORG } from './projects-list-items-for-org.token';
import type { ProjectsListItemsForOrgResponse } from './projects-list-items-for-org.token';

export function provideProjectsListItemsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListItemsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_ITEMS_FOR_ORG,
    'PROJECTS_LIST_ITEMS_FOR_ORG',
    initialBehavior,
  );
}
