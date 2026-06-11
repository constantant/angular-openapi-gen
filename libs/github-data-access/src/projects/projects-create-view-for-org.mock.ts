import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_CREATE_VIEW_FOR_ORG } from './projects-create-view-for-org.token';
import type { ProjectsCreateViewForOrgResponse } from './projects-create-view-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/create-view-for-org',
  path: '/orgs/{org}/projectsV2/{project_number}/views',
  method: 'post',
  tag: 'projects',
};

export function provideProjectsCreateViewForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsCreateViewForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_CREATE_VIEW_FOR_ORG,
    'PROJECTS_CREATE_VIEW_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
