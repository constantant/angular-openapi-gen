import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION } from './copilot-copilot-content-exclusion-for-organization.token';
import type { CopilotCopilotContentExclusionForOrganizationResponse } from './copilot-copilot-content-exclusion-for-organization.token';

export function provideCopilotCopilotContentExclusionForOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CopilotCopilotContentExclusionForOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION,
    'COPILOT_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION',
    initialBehavior,
  );
}
