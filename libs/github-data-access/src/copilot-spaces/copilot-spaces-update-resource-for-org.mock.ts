import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_RESOURCE_FOR_ORG } from './copilot-spaces-update-resource-for-org.token';
import type { CopilotSpacesUpdateResourceForOrgResponse } from './copilot-spaces-update-resource-for-org.token';

export function provideCopilotSpacesUpdateResourceForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateResourceForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_RESOURCE_FOR_ORG,
    'COPILOT_SPACES_UPDATE_RESOURCE_FOR_ORG',
    initialBehavior,
  );
}
