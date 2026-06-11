import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_RESOURCE_FOR_ORG } from './copilot-spaces-update-resource-for-org.token';
import type { CopilotSpacesUpdateResourceForOrgResponse } from './copilot-spaces-update-resource-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/update-resource-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}',
  method: 'put',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesUpdateResourceForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateResourceForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_RESOURCE_FOR_ORG,
    'COPILOT_SPACES_UPDATE_RESOURCE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
