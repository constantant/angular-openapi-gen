import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CHECKS_LIST_ANNOTATIONS } from './checks-list-annotations.token';
import type { ChecksListAnnotationsResponse } from './checks-list-annotations.token';

export function provideChecksListAnnotationsMock(
  initialBehavior?: ProviderInitialBehavior<ChecksListAnnotationsResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_LIST_ANNOTATIONS,
    'CHECKS_LIST_ANNOTATIONS',
    initialBehavior,
  );
}
