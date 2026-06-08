import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_GET_RESOURCE_FOR_ORG } from './copilot-spaces-get-resource-for-org.token';
import type { CopilotSpacesGetResourceForOrgResponse } from './copilot-spaces-get-resource-for-org.token';

export function provideCopilotSpacesGetResourceForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesGetResourceForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_GET_RESOURCE_FOR_ORG,
    'COPILOT_SPACES_GET_RESOURCE_FOR_ORG',
    initialBehavior,
  );
}
