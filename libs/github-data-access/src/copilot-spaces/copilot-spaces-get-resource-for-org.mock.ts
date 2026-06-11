import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_GET_RESOURCE_FOR_ORG } from './copilot-spaces-get-resource-for-org.token';
import type { CopilotSpacesGetResourceForOrgResponse } from './copilot-spaces-get-resource-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/get-resource-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}',
  method: 'get',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesGetResourceForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesGetResourceForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_GET_RESOURCE_FOR_ORG,
    'COPILOT_SPACES_GET_RESOURCE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
