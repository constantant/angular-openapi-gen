import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_RESOURCES_FOR_ORG } from './copilot-spaces-list-resources-for-org.token';
import type { CopilotSpacesListResourcesForOrgResponse } from './copilot-spaces-list-resources-for-org.token';

export function provideCopilotSpacesListResourcesForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListResourcesForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_RESOURCES_FOR_ORG,
    'COPILOT_SPACES_LIST_RESOURCES_FOR_ORG',
    initialBehavior,
  );
}
