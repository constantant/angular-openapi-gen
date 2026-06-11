import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_ADD_ITEM_FOR_USER } from './projects-add-item-for-user.token';
import type { ProjectsAddItemForUserResponse } from './projects-add-item-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/add-item-for-user',
  path: '/users/{username}/projectsV2/{project_number}/items',
  method: 'post',
  tag: 'projects',
};

export function provideProjectsAddItemForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsAddItemForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_ADD_ITEM_FOR_USER,
    'PROJECTS_ADD_ITEM_FOR_USER',
    initialBehavior,
    _meta,
  );
}
