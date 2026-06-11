import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_UNBLOCK_USER } from './orgs-unblock-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/unblock-user',
  path: '/orgs/{org}/blocks/{username}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsUnblockUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UNBLOCK_USER,
    'ORGS_UNBLOCK_USER',
    initialBehavior,
    _meta,
  );
}
