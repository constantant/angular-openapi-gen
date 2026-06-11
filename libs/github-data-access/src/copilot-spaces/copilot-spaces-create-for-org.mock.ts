import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_SPACES_CREATE_FOR_ORG } from './copilot-spaces-create-for-org.token';
import type { CopilotSpacesCreateForOrgResponse } from './copilot-spaces-create-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot-spaces/create-for-org',
  path: '/orgs/{org}/copilot-spaces',
  method: 'post',
  tag: 'copilot-spaces',
};

export function provideCopilotSpacesCreateForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSpacesCreateForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SPACES_CREATE_FOR_ORG,
    'COPILOT_SPACES_CREATE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
