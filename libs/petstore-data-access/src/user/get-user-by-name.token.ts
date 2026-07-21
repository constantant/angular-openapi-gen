import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type GetUserByNameResponse =
  paths['/user/{username}']['get']['responses']['200']['content']['application/json'];

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

function _validateResponse(value: unknown): GetUserByNameResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `GetUserByName response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as GetUserByNameResponse;
}

export const GET_USER_BY_NAME = new InjectionToken<
  (username: string) => ReturnType<typeof httpResource<GetUserByNameResponse>>
>('GET_USER_BY_NAME');

export function provideGetUserByName(): FactoryProvider {
  return {
    provide: GET_USER_BY_NAME,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (username: string) =>
        httpResource<GetUserByNameResponse>(
          () => ({
            url: `${base}/user/${username}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
