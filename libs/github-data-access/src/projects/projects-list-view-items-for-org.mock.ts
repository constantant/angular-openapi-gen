import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_VIEW_ITEMS_FOR_ORG } from './projects-list-view-items-for-org.token';
import type { ProjectsListViewItemsForOrgResponse } from './projects-list-view-items-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/list-view-items-for-org',
  path: '/orgs/{org}/projectsV2/{project_number}/views/{view_number}/items',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsListViewItemsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListViewItemsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_VIEW_ITEMS_FOR_ORG,
    'PROJECTS_LIST_VIEW_ITEMS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
