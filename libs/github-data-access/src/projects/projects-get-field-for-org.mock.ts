import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_FIELD_FOR_ORG } from './projects-get-field-for-org.token';
import type { ProjectsGetFieldForOrgResponse } from './projects-get-field-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/get-field-for-org',
  path: '/orgs/{org}/projectsV2/{project_number}/fields/{field_id}',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsGetFieldForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetFieldForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_FIELD_FOR_ORG,
    'PROJECTS_GET_FIELD_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
