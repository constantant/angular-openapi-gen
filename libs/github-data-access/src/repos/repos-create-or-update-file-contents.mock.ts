import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_OR_UPDATE_FILE_CONTENTS } from './repos-create-or-update-file-contents.token';
import type { ReposCreateOrUpdateFileContentsResponse } from './repos-create-or-update-file-contents.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-or-update-file-contents',
  path: '/repos/{owner}/{repo}/contents/{path}',
  method: 'put',
  tag: 'repos',
};

export function provideReposCreateOrUpdateFileContentsMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateOrUpdateFileContentsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_OR_UPDATE_FILE_CONTENTS,
    'REPOS_CREATE_OR_UPDATE_FILE_CONTENTS',
    initialBehavior,
    _meta,
  );
}
