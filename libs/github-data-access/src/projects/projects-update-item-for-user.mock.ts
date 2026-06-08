import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_UPDATE_ITEM_FOR_USER } from './projects-update-item-for-user.token';
import type { ProjectsUpdateItemForUserResponse } from './projects-update-item-for-user.token';

export function provideProjectsUpdateItemForUserMock(
  initialBehavior?: ProviderInitialBehavior<ProjectsUpdateItemForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_UPDATE_ITEM_FOR_USER,
    'PROJECTS_UPDATE_ITEM_FOR_USER',
    initialBehavior,
  );
}
