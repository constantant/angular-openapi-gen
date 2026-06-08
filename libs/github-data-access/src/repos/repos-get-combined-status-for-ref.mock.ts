import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COMBINED_STATUS_FOR_REF } from './repos-get-combined-status-for-ref.token';
import type { ReposGetCombinedStatusForRefResponse } from './repos-get-combined-status-for-ref.token';

export function provideReposGetCombinedStatusForRefMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCombinedStatusForRefResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COMBINED_STATUS_FOR_REF,
    'REPOS_GET_COMBINED_STATUS_FOR_REF',
    initialBehavior,
  );
}
