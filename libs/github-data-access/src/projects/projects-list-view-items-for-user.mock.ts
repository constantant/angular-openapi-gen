import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_VIEW_ITEMS_FOR_USER } from './projects-list-view-items-for-user.token';
import type { ProjectsListViewItemsForUserResponse } from './projects-list-view-items-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/list-view-items-for-user',
  path: '/users/{username}/projectsV2/{project_number}/views/{view_number}/items',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsListViewItemsForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListViewItemsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_VIEW_ITEMS_FOR_USER,
    'PROJECTS_LIST_VIEW_ITEMS_FOR_USER',
    initialBehavior,
    _meta,
  );
}
