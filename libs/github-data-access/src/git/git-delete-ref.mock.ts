import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GIT_DELETE_REF } from './git-delete-ref.token';

export function provideGitDeleteRefMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(GIT_DELETE_REF, 'GIT_DELETE_REF', initialBehavior);
}
