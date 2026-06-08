import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_FOR_USER } from './projects-get-for-user.token';
import type { ProjectsGetForUserResponse } from './projects-get-for-user.token';

export function provideProjectsGetForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_FOR_USER,
    'PROJECTS_GET_FOR_USER',
    initialBehavior,
  );
}
