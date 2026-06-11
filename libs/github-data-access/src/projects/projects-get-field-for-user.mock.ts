import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_FIELD_FOR_USER } from './projects-get-field-for-user.token';
import type { ProjectsGetFieldForUserResponse } from './projects-get-field-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/get-field-for-user',
  path: '/users/{username}/projectsV2/{project_number}/fields/{field_id}',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsGetFieldForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetFieldForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_FIELD_FOR_USER,
    'PROJECTS_GET_FIELD_FOR_USER',
    initialBehavior,
    _meta,
  );
}
