import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_GET_FOR_ORG } from './copilot-spaces-get-for-org.token';
import type { CopilotSpacesGetForOrgResponse } from './copilot-spaces-get-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/get-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}',
  method: 'get',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesGetForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesGetForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_GET_FOR_ORG,
    'COPILOT_SPACES_GET_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
