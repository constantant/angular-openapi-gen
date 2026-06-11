import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_ADD_FIELD_FOR_ORG } from './projects-add-field-for-org.token';
import type { ProjectsAddFieldForOrgResponse } from './projects-add-field-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/add-field-for-org',
  path: '/orgs/{org}/projectsV2/{project_number}/fields',
  method: 'post',
  tag: 'projects',
};

export function provideProjectsAddFieldForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsAddFieldForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_ADD_FIELD_FOR_ORG,
    'PROJECTS_ADD_FIELD_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
