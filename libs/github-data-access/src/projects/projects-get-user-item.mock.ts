import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_GET_USER_ITEM } from './projects-get-user-item.token';
import type { ProjectsGetUserItemResponse } from './projects-get-user-item.token';

export function provideProjectsGetUserItemMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsGetUserItemResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_GET_USER_ITEM,
    'PROJECTS_GET_USER_ITEM',
    initialBehavior,
  );
}
