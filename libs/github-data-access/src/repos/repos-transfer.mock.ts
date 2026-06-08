import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_TRANSFER } from './repos-transfer.token';
import type { ReposTransferResponse } from './repos-transfer.token';

export function provideReposTransferMock(
  initialBehavior?: ProviderInitialBehavior<ReposTransferResponse>,
): FactoryProvider {
  return provideMockResource(REPOS_TRANSFER, 'REPOS_TRANSFER', initialBehavior);
}
