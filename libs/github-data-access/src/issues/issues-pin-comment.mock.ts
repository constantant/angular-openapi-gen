import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_PIN_COMMENT } from './issues-pin-comment.token';
import type { IssuesPinCommentResponse } from './issues-pin-comment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/pin-comment',
  path: '/repos/{owner}/{repo}/issues/comments/{comment_id}/pin',
  method: 'put',
  tag: 'issues',
};

export function provideIssuesPinCommentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesPinCommentResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_PIN_COMMENT,
    'ISSUES_PIN_COMMENT',
    initialBehavior,
    _meta,
  );
}
