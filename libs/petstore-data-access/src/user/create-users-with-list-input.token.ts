import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type CreateUsersWithListInputBody = NonNullable<
  paths['/user/createWithList']['post']['requestBody']
>['content']['application/json'];

export type CreateUsersWithListInputResponse =
  paths['/user/createWithList']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      example: 10,
    },
    username: {
      type: 'string',
      example: 'theUser',
    },
    firstName: {
      type: 'string',
      example: 'John',
    },
    lastName: {
      type: 'string',
      example: 'James',
    },
    email: {
      type: 'string',
      example: 'john@email.com',
    },
    password: {
      type: 'string',
      example: '12345',
    },
    phone: {
      type: 'string',
      example: '12345',
    },
    userStatus: {
      type: 'integer',
      description: 'User Status',
      format: 'int32',
      example: 1,
    },
  },
  xml: {
    name: 'user',
  },
};

function _validateResponse(value: unknown): CreateUsersWithListInputResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `CreateUsersWithListInput response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as CreateUsersWithListInputResponse;
}

export const CREATE_USERS_WITH_LIST_INPUT = new InjectionToken<
  (
    body: CreateUsersWithListInputBody | Signal<CreateUsersWithListInputBody>,
  ) => ReturnType<typeof httpResource<CreateUsersWithListInputResponse>>
>('CREATE_USERS_WITH_LIST_INPUT');

export function provideCreateUsersWithListInput(): FactoryProvider {
  return {
    provide: CREATE_USERS_WITH_LIST_INPUT,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (
        body:
          CreateUsersWithListInputBody | Signal<CreateUsersWithListInputBody>,
      ) =>
        httpResource<CreateUsersWithListInputResponse>(
          () => ({
            url: `${base}/user/createWithList`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
