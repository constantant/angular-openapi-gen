import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_RESOURCES_FOR_ORG } from './copilot-spaces-list-resources-for-org.token';
import type { CopilotSpacesListResourcesForOrgResponse } from './copilot-spaces-list-resources-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/list-resources-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}/resources',
  method: 'get',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesListResourcesForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListResourcesForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_RESOURCES_FOR_ORG,
    'COPILOT_SPACES_LIST_RESOURCES_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
