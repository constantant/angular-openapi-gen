import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_UNPIN_COMMENT } from './issues-unpin-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/unpin-comment',
  path: '/repos/{owner}/{repo}/issues/comments/{comment_id}/pin',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesUnpinCommentMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UNPIN_COMMENT,
    'ISSUES_UNPIN_COMMENT',
    initialBehavior,
    _meta,
  );
}
