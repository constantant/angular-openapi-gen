import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_ALLOWED_ACTIONS_ORGANIZATION } from './actions-set-allowed-actions-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-allowed-actions-organization',
  path: '/orgs/{org}/actions/permissions/selected-actions',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetAllowedActionsOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_ALLOWED_ACTIONS_ORGANIZATION,
    'ACTIONS_SET_ALLOWED_ACTIONS_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
