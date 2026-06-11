import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_UPDATE_ITEM_FOR_USER } from './projects-update-item-for-user.token';
import type { ProjectsUpdateItemForUserResponse } from './projects-update-item-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/update-item-for-user',
  path: '/users/{username}/projectsV2/{project_number}/items/{item_id}',
  method: 'patch',
  tag: 'projects',
};

export function provideProjectsUpdateItemForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsUpdateItemForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_UPDATE_ITEM_FOR_USER,
    'PROJECTS_UPDATE_ITEM_FOR_USER',
    initialBehavior,
    _meta,
  );
}
