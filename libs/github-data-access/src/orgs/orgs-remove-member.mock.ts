import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REMOVE_MEMBER } from './orgs-remove-member.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/remove-member',
  path: '/orgs/{org}/members/{username}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsRemoveMemberMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REMOVE_MEMBER,
    'ORGS_REMOVE_MEMBER',
    initialBehavior,
    _meta,
  );
}
