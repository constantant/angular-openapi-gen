import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_DELETE_RESOURCE_FOR_ORG } from './copilot-spaces-delete-resource-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/delete-resource-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}/resources/{space_resource_id}',
  method: 'delete',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesDeleteResourceForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_DELETE_RESOURCE_FOR_ORG,
    'COPILOT_SPACES_DELETE_RESOURCE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
