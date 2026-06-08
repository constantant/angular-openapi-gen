import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_COLLABORATORS_FOR_ORG } from './copilot-spaces-list-collaborators-for-org.token';
import type { CopilotSpacesListCollaboratorsForOrgResponse } from './copilot-spaces-list-collaborators-for-org.token';

export function provideCopilotSpacesListCollaboratorsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListCollaboratorsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_COLLABORATORS_FOR_ORG,
    'COPILOT_SPACES_LIST_COLLABORATORS_FOR_ORG',
    initialBehavior,
  );
}
