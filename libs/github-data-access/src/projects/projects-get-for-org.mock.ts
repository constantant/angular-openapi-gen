import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_FOR_ORG } from './projects-get-for-org.token';
import type { ProjectsGetForOrgResponse } from './projects-get-for-org.token';

export function provideProjectsGetForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_FOR_ORG,
    'PROJECTS_GET_FOR_ORG',
    initialBehavior,
  );
}
