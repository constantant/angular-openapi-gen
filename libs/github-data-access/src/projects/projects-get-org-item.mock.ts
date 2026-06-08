import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_ORG_ITEM } from './projects-get-org-item.token';
import type { ProjectsGetOrgItemResponse } from './projects-get-org-item.token';

export function provideProjectsGetOrgItemMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetOrgItemResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_ORG_ITEM,
    'PROJECTS_GET_ORG_ITEM',
    initialBehavior,
  );
}
