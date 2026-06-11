import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_SET_CODESPACES_ACCESS } from './codespaces-set-codespaces-access.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/set-codespaces-access',
  path: '/orgs/{org}/codespaces/access',
  method: 'put',
  tag: 'codespaces',
};

export function provideCodespacesSetCodespacesAccessMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_SET_CODESPACES_ACCESS,
    'CODESPACES_SET_CODESPACES_ACCESS',
    initialBehavior,
    _meta,
  );
}
