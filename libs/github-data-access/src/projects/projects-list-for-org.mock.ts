import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_FOR_ORG } from './projects-list-for-org.token';
import type { ProjectsListForOrgResponse } from './projects-list-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/list-for-org',
  path: '/orgs/{org}/projectsV2',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsListForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_FOR_ORG,
    'PROJECTS_LIST_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
