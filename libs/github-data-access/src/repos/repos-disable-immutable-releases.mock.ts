import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DISABLE_IMMUTABLE_RELEASES } from './repos-disable-immutable-releases.token';

export function provideReposDisableImmutableReleasesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DISABLE_IMMUTABLE_RELEASES,
    'REPOS_DISABLE_IMMUTABLE_RELEASES',
    initialBehavior,
  );
}
