import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_CHECK_IF_MERGED } from './pulls-check-if-merged.token';

export function providePullsCheckIfMergedMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PULLS_CHECK_IF_MERGED,
    'PULLS_CHECK_IF_MERGED',
    initialBehavior,
  );
}
