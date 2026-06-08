import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_DELETE_FOR_ORG } from './copilot-spaces-delete-for-org.token';

export function provideCopilotSpacesDeleteForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_DELETE_FOR_ORG,
    'COPILOT_SPACES_DELETE_FOR_ORG',
    initialBehavior,
  );
}
