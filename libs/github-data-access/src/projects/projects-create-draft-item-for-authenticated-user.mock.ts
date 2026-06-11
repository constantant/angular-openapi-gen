import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PROJECTS_CREATE_DRAFT_ITEM_FOR_AUTHENTICATED_USER } from './projects-create-draft-item-for-authenticated-user.token';
import type { ProjectsCreateDraftItemForAuthenticatedUserResponse } from './projects-create-draft-item-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'projects/create-draft-item-for-authenticated-user',
  path: '/user/{user_id}/projectsV2/{project_number}/drafts',
  method: 'post',
  tag: 'projects',
};

export function provideProjectsCreateDraftItemForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsCreateDraftItemForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_CREATE_DRAFT_ITEM_FOR_AUTHENTICATED_USER,
    'PROJECTS_CREATE_DRAFT_ITEM_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
