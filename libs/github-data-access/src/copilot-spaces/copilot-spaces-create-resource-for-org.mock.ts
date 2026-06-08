import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_CREATE_RESOURCE_FOR_ORG } from './copilot-spaces-create-resource-for-org.token';
import type { CopilotSpacesCreateResourceForOrgResponse } from './copilot-spaces-create-resource-for-org.token';

export function provideCopilotSpacesCreateResourceForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesCreateResourceForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_CREATE_RESOURCE_FOR_ORG,
    'COPILOT_SPACES_CREATE_RESOURCE_FOR_ORG',
    initialBehavior,
  );
}
