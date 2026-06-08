import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_LIST_FIELDS_FOR_ORG } from './projects-list-fields-for-org.token';
import type { ProjectsListFieldsForOrgResponse } from './projects-list-fields-for-org.token';

export function provideProjectsListFieldsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsListFieldsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_LIST_FIELDS_FOR_ORG,
    'PROJECTS_LIST_FIELDS_FOR_ORG',
    initialBehavior,
  );
}
