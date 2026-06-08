import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_CREATE_DRAFT_ITEM_FOR_ORG } from './projects-create-draft-item-for-org.token';
import type { ProjectsCreateDraftItemForOrgResponse } from './projects-create-draft-item-for-org.token';

export function provideProjectsCreateDraftItemForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsCreateDraftItemForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_CREATE_DRAFT_ITEM_FOR_ORG,
    'PROJECTS_CREATE_DRAFT_ITEM_FOR_ORG',
    initialBehavior,
  );
}
