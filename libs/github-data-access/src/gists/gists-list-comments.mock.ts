import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_LIST_COMMENTS } from './gists-list-comments.token';
import type { GistsListCommentsResponse } from './gists-list-comments.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/list-comments',
  path: '/gists/{gist_id}/comments',
  method: 'get',
  tag: 'gists',
};

export function provideGistsListCommentsMock(
  initialBehavior?: ProviderInitialBehavior<GistsListCommentsResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_LIST_COMMENTS,
    'GISTS_LIST_COMMENTS',
    initialBehavior,
    _meta,
  );
}
