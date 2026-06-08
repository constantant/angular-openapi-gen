import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_AUTOLINK } from './repos-create-autolink.token';
import type { ReposCreateAutolinkResponse } from './repos-create-autolink.token';

export function provideReposCreateAutolinkMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateAutolinkResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_AUTOLINK,
    'REPOS_CREATE_AUTOLINK',
    initialBehavior,
  );
}
