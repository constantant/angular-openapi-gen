import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type LoginUserParams =
  paths['/user/login']['get']['parameters']['query'];

export type LoginUserResponse =
  paths['/user/login']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'string',
};

function _validateResponse(value: unknown): LoginUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `LoginUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as LoginUserResponse;
}

export const LOGIN_USER = new InjectionToken<
  (
    params?: LoginUserParams | (() => LoginUserParams | undefined),
  ) => ReturnType<typeof httpResource<LoginUserResponse>>
>('LOGIN_USER');

export function provideLoginUser(): FactoryProvider {
  return {
    provide: LOGIN_USER,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (params?: LoginUserParams | (() => LoginUserParams | undefined)) =>
        httpResource<LoginUserResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/user/login`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
          { parse: _validateResponse },
        );
    },
  };
}
