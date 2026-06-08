import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_SET_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION } from './copilot-set-copilot-content-exclusion-for-organization.token';
import type { CopilotSetCopilotContentExclusionForOrganizationResponse } from './copilot-set-copilot-content-exclusion-for-organization.token';

export function provideCopilotSetCopilotContentExclusionForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CopilotSetCopilotContentExclusionForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_SET_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION,
    'COPILOT_SET_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION',
    initialBehavior,
  );
}
