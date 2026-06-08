import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_GET_FOR_ORG } from './copilot-spaces-get-for-org.token';
import type { CopilotSpacesGetForOrgResponse } from './copilot-spaces-get-for-org.token';

export function provideCopilotSpacesGetForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesGetForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_GET_FOR_ORG,
    'COPILOT_SPACES_GET_FOR_ORG',
    initialBehavior,
  );
}
