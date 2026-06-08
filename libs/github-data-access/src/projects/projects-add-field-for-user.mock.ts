import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_ADD_FIELD_FOR_USER } from './projects-add-field-for-user.token';
import type { ProjectsAddFieldForUserResponse } from './projects-add-field-for-user.token';

export function provideProjectsAddFieldForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsAddFieldForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_ADD_FIELD_FOR_USER,
    'PROJECTS_ADD_FIELD_FOR_USER',
    initialBehavior,
  );
}
