import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_DELETE_ITEM_FOR_USER } from './projects-delete-item-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/delete-item-for-user',
  path: '/users/{username}/projectsV2/{project_number}/items/{item_id}',
  method: 'delete',
  tag: 'projects',
};

export function provideProjectsDeleteItemForUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_DELETE_ITEM_FOR_USER,
    'PROJECTS_DELETE_ITEM_FOR_USER',
    initialBehavior,
    _meta,
  );
}
