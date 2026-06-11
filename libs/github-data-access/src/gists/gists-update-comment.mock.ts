import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_UPDATE_COMMENT } from './gists-update-comment.token';
import type { GistsUpdateCommentResponse } from './gists-update-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/update-comment',
  path: '/gists/{gist_id}/comments/{comment_id}',
  method: 'patch',
  tag: 'gists',
};

export function provideGistsUpdateCommentMock(
  initialBehavior?: ProviderInitialBehavior<GistsUpdateCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_UPDATE_COMMENT,
    'GISTS_UPDATE_COMMENT',
    initialBehavior,
    _meta,
  );
}
