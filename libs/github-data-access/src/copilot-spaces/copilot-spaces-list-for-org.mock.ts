import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_LIST_FOR_ORG } from './copilot-spaces-list-for-org.token';
import type { CopilotSpacesListForOrgResponse } from './copilot-spaces-list-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/list-for-org',
  path: '/orgs/{org}/copilot-spaces',
  method: 'get',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesListForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesListForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_LIST_FOR_ORG,
    'COPILOT_SPACES_LIST_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
