import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_ORG } from './copilot-spaces-update-collaborator-for-org.token';
import type { CopilotSpacesUpdateCollaboratorForOrgResponse } from './copilot-spaces-update-collaborator-for-org.token';

export function provideCopilotSpacesUpdateCollaboratorForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateCollaboratorForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_ORG,
    'COPILOT_SPACES_UPDATE_COLLABORATOR_FOR_ORG',
    initialBehavior,
  );
}
