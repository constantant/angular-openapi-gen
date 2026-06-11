import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION } from './copilot-copilot-content-exclusion-for-organization.token';
import type { CopilotCopilotContentExclusionForOrganizationResponse } from './copilot-copilot-content-exclusion-for-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/copilot-content-exclusion-for-organization',
  path: '/orgs/{org}/copilot/content_exclusion',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotCopilotContentExclusionForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotContentExclusionForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION,
    'COPILOT_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
