import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_GET_REF } from './git-get-ref.token';
import type { GitGetRefResponse } from './git-get-ref.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/get-ref',
  path: '/repos/{owner}/{repo}/git/ref/{ref}',
  method: 'get',
  tag: 'git',
};

export function provideGitGetRefMock(
  initialBehavior?: ProviderInitialBehavior<GitGetRefResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_GET_REF,
    'GIT_GET_REF',
    initialBehavior,
    _meta,
  );
}
