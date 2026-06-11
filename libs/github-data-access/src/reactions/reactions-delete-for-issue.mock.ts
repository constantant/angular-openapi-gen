import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_ISSUE } from './reactions-delete-for-issue.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/delete-for-issue',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}',
  method: 'delete',
  tag: 'reactions',
};

export function provideReactionsDeleteForIssueMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_ISSUE,
    'REACTIONS_DELETE_FOR_ISSUE',
    initialBehavior,
    _meta,
  );
}
