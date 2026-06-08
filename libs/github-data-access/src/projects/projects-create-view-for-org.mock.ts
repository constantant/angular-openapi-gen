import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_CREATE_VIEW_FOR_ORG } from './projects-create-view-for-org.token';
import type { ProjectsCreateViewForOrgResponse } from './projects-create-view-for-org.token';

export function provideProjectsCreateViewForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsCreateViewForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_CREATE_VIEW_FOR_ORG,
    'PROJECTS_CREATE_VIEW_FOR_ORG',
    initialBehavior,
  );
}
