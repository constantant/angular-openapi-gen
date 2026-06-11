import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_DELETE_ITEM_FOR_ORG } from './projects-delete-item-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/delete-item-for-org',
  path: '/orgs/{org}/projectsV2/{project_number}/items/{item_id}',
  method: 'delete',
  tag: 'projects',
};

export function provideProjectsDeleteItemForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_DELETE_ITEM_FOR_ORG,
    'PROJECTS_DELETE_ITEM_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
