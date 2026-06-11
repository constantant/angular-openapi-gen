import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_USER_ITEM } from './projects-get-user-item.token';
import type { ProjectsGetUserItemResponse } from './projects-get-user-item.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/get-user-item',
  path: '/users/{username}/projectsV2/{project_number}/items/{item_id}',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsGetUserItemMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetUserItemResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_USER_ITEM,
    'PROJECTS_GET_USER_ITEM',
    initialBehavior,
    _meta,
  );
}
