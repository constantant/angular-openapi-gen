import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GISTS_CREATE_COMMENT } from './gists-create-comment.token';
import type { GistsCreateCommentResponse } from './gists-create-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gists/create-comment',
  path: '/gists/{gist_id}/comments',
  method: 'post',
  tag: 'gists',
};

export function provideGistsCreateCommentMock(
  initialBehavior?: ProviderInitialBehavior<GistsCreateCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    GISTS_CREATE_COMMENT,
    'GISTS_CREATE_COMMENT',
    initialBehavior,
    _meta,
  );
}
