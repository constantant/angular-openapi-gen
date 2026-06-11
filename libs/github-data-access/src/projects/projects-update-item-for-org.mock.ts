import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_UPDATE_ITEM_FOR_ORG } from './projects-update-item-for-org.token';
import type { ProjectsUpdateItemForOrgResponse } from './projects-update-item-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/update-item-for-org',
  path: '/orgs/{org}/projectsV2/{project_number}/items/{item_id}',
  method: 'patch',
  tag: 'projects',
};

export function provideProjectsUpdateItemForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsUpdateItemForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_UPDATE_ITEM_FOR_ORG,
    'PROJECTS_UPDATE_ITEM_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
