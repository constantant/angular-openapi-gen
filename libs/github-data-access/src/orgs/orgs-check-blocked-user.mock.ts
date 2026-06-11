import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CHECK_BLOCKED_USER } from './orgs-check-blocked-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/check-blocked-user',
  path: '/orgs/{org}/blocks/{username}',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsCheckBlockedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CHECK_BLOCKED_USER,
    'ORGS_CHECK_BLOCKED_USER',
    initialBehavior,
    _meta,
  );
}
