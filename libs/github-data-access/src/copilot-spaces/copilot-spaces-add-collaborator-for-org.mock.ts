import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_ADD_COLLABORATOR_FOR_ORG } from './copilot-spaces-add-collaborator-for-org.token';
import type { CopilotSpacesAddCollaboratorForOrgResponse } from './copilot-spaces-add-collaborator-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/add-collaborator-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}/collaborators',
  method: 'post',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesAddCollaboratorForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesAddCollaboratorForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_ADD_COLLABORATOR_FOR_ORG,
    'COPILOT_SPACES_ADD_COLLABORATOR_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
