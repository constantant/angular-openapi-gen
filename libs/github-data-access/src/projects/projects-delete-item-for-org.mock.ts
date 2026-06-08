import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PROJECTS_DELETE_ITEM_FOR_ORG } from './projects-delete-item-for-org.token';

export function provideProjectsDeleteItemForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PROJECTS_DELETE_ITEM_FOR_ORG,
    'PROJECTS_DELETE_ITEM_FOR_ORG',
    initialBehavior,
  );
}
