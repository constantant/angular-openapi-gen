import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { COPILOT_GET_COPILOT_ORGANIZATION_DETAILS } from './copilot-get-copilot-organization-details.token';
import type { CopilotGetCopilotOrganizationDetailsResponse } from './copilot-get-copilot-organization-details.token';

export function provideCopilotGetCopilotOrganizationDetailsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotGetCopilotOrganizationDetailsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_GET_COPILOT_ORGANIZATION_DETAILS,
    'COPILOT_GET_COPILOT_ORGANIZATION_DETAILS',
    initialBehavior,
  );
}
