import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_BLOCK_USER } from './orgs-block-user.token';

export function provideOrgsBlockUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_BLOCK_USER,
    'ORGS_BLOCK_USER',
    initialBehavior,
  );
}
