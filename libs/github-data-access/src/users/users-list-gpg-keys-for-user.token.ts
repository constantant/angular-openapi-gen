import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListGpgKeysForUserParams =
  paths['/users/{username}/gpg_keys']['get']['parameters']['query'];

export type UsersListGpgKeysForUserResponse =
  paths['/users/{username}/gpg_keys']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'GPG Key',
    description: 'A unique encryption key',
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
        example: 3,
      },
      name: {
        type: ['string', 'null'],
        example: "Octocat's GPG Key",
      },
      primary_key_id: {
        type: ['integer', 'null'],
      },
      key_id: {
        type: 'string',
        example: '3262EFF25BA0D270',
      },
      public_key: {
        type: 'string',
        example: 'xsBNBFayYZ...',
      },
      emails: {
        type: 'array',
        example: [
          {
            email: 'octocat@users.noreply.github.com',
            verified: true,
          },
        ],
        items: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
            verified: {
              type: 'boolean',
            },
          },
        },
      },
      subkeys: {
        type: 'array',
        example: [
          {
            id: 4,
            primary_key_id: 3,
            key_id: '4A595D4C72EE49C7',
            public_key: 'zsBNBFayYZ...',
            emails: [],
            can_sign: false,
            can_encrypt_comms: true,
            can_encrypt_storage: true,
            can_certify: false,
            created_at: '2016-03-24T11:31:04-06:00',
            expires_at: null,
            revoked: false,
          },
        ],
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            primary_key_id: {
              type: 'integer',
            },
            key_id: {
              type: 'string',
            },
            public_key: {
              type: 'string',
            },
            emails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  verified: {
                    type: 'boolean',
                  },
                },
              },
            },
            subkeys: {
              type: 'array',
              items: {},
            },
            can_sign: {
              type: 'boolean',
            },
            can_encrypt_comms: {
              type: 'boolean',
            },
            can_encrypt_storage: {
              type: 'boolean',
            },
            can_certify: {
              type: 'boolean',
            },
            created_at: {
              type: 'string',
            },
            expires_at: {
              type: ['string', 'null'],
            },
            raw_key: {
              type: ['string', 'null'],
            },
            revoked: {
              type: 'boolean',
            },
          },
        },
      },
      can_sign: {
        type: 'boolean',
        example: true,
      },
      can_encrypt_comms: {
        type: 'boolean',
      },
      can_encrypt_storage: {
        type: 'boolean',
      },
      can_certify: {
        type: 'boolean',
        example: true,
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2016-03-24T11:31:04-06:00',
      },
      expires_at: {
        type: ['string', 'null'],
        format: 'date-time',
      },
      revoked: {
        type: 'boolean',
        example: true,
      },
      raw_key: {
        type: ['string', 'null'],
      },
    },
    required: [
      'id',
      'primary_key_id',
      'key_id',
      'raw_key',
      'public_key',
      'created_at',
      'expires_at',
      'can_sign',
      'can_encrypt_comms',
      'can_encrypt_storage',
      'can_certify',
      'emails',
      'subkeys',
      'revoked',
    ],
  },
};

function _validateResponse(value: unknown): UsersListGpgKeysForUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersListGpgKeysForUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersListGpgKeysForUserResponse;
}

export const USERS_LIST_GPG_KEYS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | UsersListGpgKeysForUserParams
      | (() => UsersListGpgKeysForUserParams | undefined),
  ) => ReturnType<typeof httpResource<UsersListGpgKeysForUserResponse>>
>('USERS_LIST_GPG_KEYS_FOR_USER');

export function provideUsersListGpgKeysForUser(): FactoryProvider {
  return {
    provide: USERS_LIST_GPG_KEYS_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | UsersListGpgKeysForUserParams
          | (() => UsersListGpgKeysForUserParams | undefined),
      ) =>
        httpResource<UsersListGpgKeysForUserResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/users/${username}/gpg_keys`,
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
