import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_FIELD_FOR_ORG } from './projects-get-field-for-org.token';
import type { ProjectsGetFieldForOrgResponse } from './projects-get-field-for-org.token';

export function provideProjectsGetFieldForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetFieldForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_FIELD_FOR_ORG,
    'PROJECTS_GET_FIELD_FOR_ORG',
    initialBehavior,
  );
}
