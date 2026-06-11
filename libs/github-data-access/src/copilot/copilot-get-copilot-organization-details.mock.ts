import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { COPILOT_GET_COPILOT_ORGANIZATION_DETAILS } from './copilot-get-copilot-organization-details.token';
import type { CopilotGetCopilotOrganizationDetailsResponse } from './copilot-get-copilot-organization-details.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'copilot/get-copilot-organization-details',
  path: '/orgs/{org}/copilot/billing',
  method: 'get',
  tag: 'copilot',
};

export function provideCopilotGetCopilotOrganizationDetailsMock(
  initialBehavior?: ProviderInitialBehavior<CopilotGetCopilotOrganizationDetailsResponse>,
): FactoryProvider {
  return provideMockResource(
    COPILOT_GET_COPILOT_ORGANIZATION_DETAILS,
    'COPILOT_GET_COPILOT_ORGANIZATION_DETAILS',
    initialBehavior,
    _meta,
  );
}
