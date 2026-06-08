import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_FOR_ORG } from './copilot-spaces-list-for-org.token';
import type { CopilotSpacesListForOrgResponse } from './copilot-spaces-list-for-org.token';

export function provideCopilotSpacesListForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_FOR_ORG,
    'COPILOT_SPACES_LIST_FOR_ORG',
    initialBehavior,
  );
}
