import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_CREATE_REF } from './git-create-ref.token';
import type { GitCreateRefResponse } from './git-create-ref.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/create-ref',
  path: '/repos/{owner}/{repo}/git/refs',
  method: 'post',
  tag: 'git',
};

export function provideGitCreateRefMock(
  initialBehavior?: ProviderInitialBehavior<GitCreateRefResponse>,
): FactoryProvider {
  return provideMockResource(
    GIT_CREATE_REF,
    'GIT_CREATE_REF',
    initialBehavior,
    _meta,
  );
}
