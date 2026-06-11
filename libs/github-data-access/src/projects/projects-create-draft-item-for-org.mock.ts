import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_CREATE_DRAFT_ITEM_FOR_ORG } from './projects-create-draft-item-for-org.token';
import type { ProjectsCreateDraftItemForOrgResponse } from './projects-create-draft-item-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/create-draft-item-for-org',
  path: '/orgs/{org}/projectsV2/{project_number}/drafts',
  method: 'post',
  tag: 'projects',
};

export function provideProjectsCreateDraftItemForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsCreateDraftItemForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_CREATE_DRAFT_ITEM_FOR_ORG,
    'PROJECTS_CREATE_DRAFT_ITEM_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
