import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_ADD_FIELD_FOR_ORG } from './projects-add-field-for-org.token';
import type { ProjectsAddFieldForOrgResponse } from './projects-add-field-for-org.token';

export function provideProjectsAddFieldForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsAddFieldForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_ADD_FIELD_FOR_ORG,
    'PROJECTS_ADD_FIELD_FOR_ORG',
    initialBehavior,
  );
}
