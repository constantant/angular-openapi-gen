import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_FOR_USER } from './projects-get-for-user.token';
import type { ProjectsGetForUserResponse } from './projects-get-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/get-for-user',
  path: '/users/{username}/projectsV2/{project_number}',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsGetForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetForUserResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_FOR_USER,
    'PROJECTS_GET_FOR_USER',
    initialBehavior,
    _meta,
    options,
  );
}
