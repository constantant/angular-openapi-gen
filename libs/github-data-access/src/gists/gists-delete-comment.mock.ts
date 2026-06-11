import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_DELETE_COMMENT } from './gists-delete-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/delete-comment',
  path: '/gists/{gist_id}/comments/{comment_id}',
  method: 'delete',
  tag: 'gists',
};

export function provideGistsDeleteCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    GISTS_DELETE_COMMENT,
    'GISTS_DELETE_COMMENT',
    initialBehavior,
    _meta,
  );
}
