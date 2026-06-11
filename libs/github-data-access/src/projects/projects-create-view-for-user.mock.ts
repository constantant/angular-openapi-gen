import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_CREATE_VIEW_FOR_USER } from './projects-create-view-for-user.token';
import type { ProjectsCreateViewForUserResponse } from './projects-create-view-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/create-view-for-user',
  path: '/users/{user_id}/projectsV2/{project_number}/views',
  method: 'post',
  tag: 'projects',
};

export function provideProjectsCreateViewForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsCreateViewForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_CREATE_VIEW_FOR_USER,
    'PROJECTS_CREATE_VIEW_FOR_USER',
    initialBehavior,
    _meta,
  );
}
