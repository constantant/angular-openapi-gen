import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_CREATE_FOR_ORG } from './copilot-spaces-create-for-org.token';
import type { CopilotSpacesCreateForOrgResponse } from './copilot-spaces-create-for-org.token';

export function provideCopilotSpacesCreateForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesCreateForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_CREATE_FOR_ORG,
    'COPILOT_SPACES_CREATE_FOR_ORG',
    initialBehavior,
  );
}
