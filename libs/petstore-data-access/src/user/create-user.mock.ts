import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CREATE_USER } from './create-user.token';
import type { CreateUserResponse } from './create-user.token';

export function provideCreateUserMock(
  initialBehavior?: ProviderInitialBehavior<CreateUserResponse>,
): FactoryProvider {
  return provideMockResource(CREATE_USER, 'CREATE_USER', initialBehavior);
}
