import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_COLLABORATORS_FOR_ORG } from './copilot-spaces-list-collaborators-for-org.token';
import type { CopilotSpacesListCollaboratorsForOrgResponse } from './copilot-spaces-list-collaborators-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/list-collaborators-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}/collaborators',
  method: 'get',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesListCollaboratorsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListCollaboratorsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_COLLABORATORS_FOR_ORG,
    'COPILOT_SPACES_LIST_COLLABORATORS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
