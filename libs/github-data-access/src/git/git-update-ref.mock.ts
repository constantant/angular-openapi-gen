import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_UPDATE_REF } from './git-update-ref.token';
import type { GitUpdateRefResponse } from './git-update-ref.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/update-ref',
  path: '/repos/{owner}/{repo}/git/refs/{ref}',
  method: 'patch',
  tag: 'git',
};

export function provideGitUpdateRefMock(
  initialBehavior?: ProviderInitialBehavior<GitUpdateRefResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    GIT_UPDATE_REF,
    'GIT_UPDATE_REF',
    initialBehavior,
    _meta,
    options,
  );
}
