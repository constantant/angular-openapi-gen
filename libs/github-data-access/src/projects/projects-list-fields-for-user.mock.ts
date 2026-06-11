import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_FIELDS_FOR_USER } from './projects-list-fields-for-user.token';
import type { ProjectsListFieldsForUserResponse } from './projects-list-fields-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/list-fields-for-user',
  path: '/users/{username}/projectsV2/{project_number}/fields',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsListFieldsForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListFieldsForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_FIELDS_FOR_USER,
    'PROJECTS_LIST_FIELDS_FOR_USER',
    initialBehavior,
    _meta,
  );
}
