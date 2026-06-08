import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_ADD_COLLABORATOR_FOR_ORG } from './copilot-spaces-add-collaborator-for-org.token';
import type { CopilotSpacesAddCollaboratorForOrgResponse } from './copilot-spaces-add-collaborator-for-org.token';

export function provideCopilotSpacesAddCollaboratorForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesAddCollaboratorForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_ADD_COLLABORATOR_FOR_ORG,
    'COPILOT_SPACES_ADD_COLLABORATOR_FOR_ORG',
    initialBehavior,
  );
}
