import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_CREATE_VIEW_FOR_USER } from './projects-create-view-for-user.token';
import type { ProjectsCreateViewForUserResponse } from './projects-create-view-for-user.token';

export function provideProjectsCreateViewForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsCreateViewForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_CREATE_VIEW_FOR_USER,
    'PROJECTS_CREATE_VIEW_FOR_USER',
    initialBehavior,
  );
}
