import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_ENABLE_IMMUTABLE_RELEASES } from './repos-enable-immutable-releases.token';

export function provideReposEnableImmutableReleasesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ENABLE_IMMUTABLE_RELEASES,
    'REPOS_ENABLE_IMMUTABLE_RELEASES',
    initialBehavior,
  );
}
