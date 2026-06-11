import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_EXPORT_FOR_AUTHENTICATED_USER } from './codespaces-export-for-authenticated-user.token';
import type { CodespacesExportForAuthenticatedUserResponse } from './codespaces-export-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/export-for-authenticated-user',
  path: '/user/codespaces/{codespace_name}/exports',
  method: 'post',
  tag: 'codespaces',
};

export function provideCodespacesExportForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesExportForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_EXPORT_FOR_AUTHENTICATED_USER,
    'CODESPACES_EXPORT_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
