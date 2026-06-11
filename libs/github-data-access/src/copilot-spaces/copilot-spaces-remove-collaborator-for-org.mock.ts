import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_REMOVE_COLLABORATOR_FOR_ORG } from './copilot-spaces-remove-collaborator-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/remove-collaborator-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}/collaborators/{actor_type}/{actor_identifier}',
  method: 'delete',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesRemoveCollaboratorForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_REMOVE_COLLABORATOR_FOR_ORG,
    'COPILOT_SPACES_REMOVE_COLLABORATOR_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
