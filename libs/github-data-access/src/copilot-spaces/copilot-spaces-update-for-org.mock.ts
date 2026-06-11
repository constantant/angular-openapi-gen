import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_UPDATE_FOR_ORG } from './copilot-spaces-update-for-org.token';
import type { CopilotSpacesUpdateForOrgResponse } from './copilot-spaces-update-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/update-for-org',
  path: '/orgs/{org}/copilot-spaces/{space_number}',
  method: 'put',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesUpdateForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesUpdateForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_UPDATE_FOR_ORG,
    'COPILOT_SPACES_UPDATE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
