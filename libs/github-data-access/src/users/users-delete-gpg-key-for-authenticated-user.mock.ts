import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER } from './users-delete-gpg-key-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'users/delete-gpg-key-for-authenticated-user',
  path: '/user/gpg_keys/{gpg_key_id}',
  method: 'delete',
  tag: 'users',
};

export function provideUsersDeleteGpgKeyForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER,
    'USERS_DELETE_GPG_KEY_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
