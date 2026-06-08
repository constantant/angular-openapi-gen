import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_FOR_AUTHENTICATED_USER } from './issues-list-for-authenticated-user.token';
import type { IssuesListForAuthenticatedUserResponse } from './issues-list-for-authenticated-user.token';

export function provideIssuesListForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_FOR_AUTHENTICATED_USER,
    'ISSUES_LIST_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
