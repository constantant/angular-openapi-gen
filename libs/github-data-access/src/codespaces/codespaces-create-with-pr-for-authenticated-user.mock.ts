import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_WITH_PR_FOR_AUTHENTICATED_USER } from './codespaces-create-with-pr-for-authenticated-user.token';
import type { CodespacesCreateWithPrForAuthenticatedUserResponse } from './codespaces-create-with-pr-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/create-with-pr-for-authenticated-user',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/codespaces',
  method: 'post',
  tag: 'codespaces',
};

export function provideCodespacesCreateWithPrForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateWithPrForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_WITH_PR_FOR_AUTHENTICATED_USER,
    'CODESPACES_CREATE_WITH_PR_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
