import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_FIELDS_FOR_ORG } from './projects-list-fields-for-org.token';
import type { ProjectsListFieldsForOrgResponse } from './projects-list-fields-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/list-fields-for-org',
  path: '/orgs/{org}/projectsV2/{project_number}/fields',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsListFieldsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListFieldsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_FIELDS_FOR_ORG,
    'PROJECTS_LIST_FIELDS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
