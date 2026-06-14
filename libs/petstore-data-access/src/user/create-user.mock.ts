import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CREATE_USER } from './create-user.token';
import type { CreateUserResponse } from './create-user.token';

const _meta: MockResourceMeta = {
  specId: 'petstore',
  operationId: 'createUser',
  path: '/user',
  method: 'post',
  tag: 'user',
};

export function provideCreateUserMock(
  initialBehavior?: ProviderInitialBehavior<CreateUserResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    CREATE_USER,
    'CREATE_USER',
    initialBehavior,
    _meta,
    options,
  );
}
