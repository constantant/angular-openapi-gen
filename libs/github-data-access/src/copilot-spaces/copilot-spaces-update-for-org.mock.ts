import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_FOR_ORG } from './copilot-spaces-update-for-org.token';
import type { CopilotSpacesUpdateForOrgResponse } from './copilot-spaces-update-for-org.token';

export function provideCopilotSpacesUpdateForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_FOR_ORG,
    'COPILOT_SPACES_UPDATE_FOR_ORG',
    initialBehavior,
  );
}
