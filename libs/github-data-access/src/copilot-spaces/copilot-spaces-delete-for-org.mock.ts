import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_DELETE_FOR_ORG } from './copilot-spaces-delete-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/delete-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}',
  method: 'delete',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesDeleteForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_DELETE_FOR_ORG,
    'COPILOT_SPACES_DELETE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
