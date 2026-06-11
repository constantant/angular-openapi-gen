import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_ADD_ITEM_FOR_ORG } from './projects-add-item-for-org.token';
import type { ProjectsAddItemForOrgResponse } from './projects-add-item-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/add-item-for-org',
  path: '/orgs/{org}/projectsV2/{project_number}/items',
  method: 'post',
  tag: 'projects',
};

export function provideProjectsAddItemForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsAddItemForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_ADD_ITEM_FOR_ORG,
    'PROJECTS_ADD_ITEM_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
