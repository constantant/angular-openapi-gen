import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GIT_DELETE_REF } from './git-delete-ref.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'git/delete-ref',
  path: '/repos/{owner}/{repo}/git/refs/{ref}',
  method: 'delete',
  tag: 'git',
};

export function provideGitDeleteRefMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    GIT_DELETE_REF,
    'GIT_DELETE_REF',
    initialBehavior,
    _meta,
  );
}
