import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_FOR_USER } from './projects-list-for-user.token';
import type { ProjectsListForUserResponse } from './projects-list-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/list-for-user',
  path: '/users/{username}/projectsV2',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsListForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_FOR_USER,
    'PROJECTS_LIST_FOR_USER',
    initialBehavior,
    _meta,
  );
}
