import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_ORG_ITEM } from './projects-get-org-item.token';
import type { ProjectsGetOrgItemResponse } from './projects-get-org-item.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/get-org-item',
  path: '/orgs/{org}/projectsV2/{project_number}/items/{item_id}',
  method: 'get',
  tag: 'projects',
};

export function provideProjectsGetOrgItemMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetOrgItemResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_ORG_ITEM,
    'PROJECTS_GET_ORG_ITEM',
    initialBehavior,
    _meta,
  );
}
