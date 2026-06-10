import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CREATE_USERS_WITH_LIST_INPUT } from './create-users-with-list-input.token';
import type { CreateUsersWithListInputResponse } from './create-users-with-list-input.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'createUsersWithListInput',
  path: '/user/createWithList',
  method: 'post',
  tag: 'user',
};

export function provideCreateUsersWithListInputMock(
  initialBehavior?: ProviderInitialBehavior<CreateUsersWithListInputResponse>,
): FactoryProvider {
  return provideMockResource(
    CREATE_USERS_WITH_LIST_INPUT,
    'CREATE_USERS_WITH_LIST_INPUT',
    initialBehavior,
    _meta,
  );
}
