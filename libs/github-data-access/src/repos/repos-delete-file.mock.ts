import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_FILE } from './repos-delete-file.token';
import type { ReposDeleteFileResponse } from './repos-delete-file.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-file',
  path: '/repos/{owner}/{repo}/contents/{path}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteFileMock(
  initialBehavior?: ProviderInitialBehavior<ReposDeleteFileResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_FILE,
    'REPOS_DELETE_FILE',
    initialBehavior,
    _meta,
  );
}
