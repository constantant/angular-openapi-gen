import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_GET_COMMENT } from './gists-get-comment.token';
import type { GistsGetCommentResponse } from './gists-get-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/get-comment',
  path: '/gists/{gist_id}/comments/{comment_id}',
  method: 'get',
  tag: 'gists',
};

export function provideGistsGetCommentMock(
  initialBehavior?: ProviderInitialBehavior<GistsGetCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_GET_COMMENT,
    'GISTS_GET_COMMENT',
    initialBehavior,
    _meta,
  );
}
