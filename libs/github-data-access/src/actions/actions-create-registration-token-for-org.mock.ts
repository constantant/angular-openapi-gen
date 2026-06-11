import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG } from './actions-create-registration-token-for-org.token';
import type { ActionsCreateRegistrationTokenForOrgResponse } from './actions-create-registration-token-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/create-registration-token-for-org',
  path: '/orgs/{org}/actions/runners/registration-token',
  method: 'post',
  tag: 'actions',
};

export function provideActionsCreateRegistrationTokenForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateRegistrationTokenForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG,
    'ACTIONS_CREATE_REGISTRATION_TOKEN_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
