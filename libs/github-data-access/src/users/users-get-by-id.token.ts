import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths, components } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersGetByIdResponse =
  paths['/user/{account_id}']['get']['responses']['200']['content']['application/json'];

export type UsersGetByIdError =
  paths['/user/{account_id}']['get']['responses']['404']['content']['application/json'];

export type UsersGetByIdDiscriminatorKey = 'public' | 'private';

export type UsersGetByIdPublic = components['schemas']['public-user'] & {
  user_view_type: 'public';
};

export type UsersGetByIdPrivate = components['schemas']['private-user'] & {
  user_view_type: 'private';
};

export type UsersGetByIdDiscriminated =
  UsersGetByIdPublic | UsersGetByIdPrivate;

const _responseSchema: Schema = {
  oneOf: [
    {
      title: 'Private User',
      description: 'Private User',
      type: 'object',
      properties: {
        login: {
          type: 'string',
          example: 'octocat',
        },
        id: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
        user_view_type: {
          type: 'string',
        },
        node_id: {
          type: 'string',
          example: 'MDQ6VXNlcjE=',
        },
        avatar_url: {
          type: 'string',
          format: 'uri',
          example: 'https://github.com/images/error/octocat_happy.gif',
        },
        gravatar_id: {
          type: ['string', 'null'],
          example: '41d064eb2195891e12d0413f63227ea7',
        },
        url: {
          type: 'string',
          format: 'uri',
          example: 'https://api.github.com/users/octocat',
        },
        html_url: {
          type: 'string',
          format: 'uri',
          example: 'https://github.com/octocat',
        },
        followers_url: {
          type: 'string',
          format: 'uri',
          example: 'https://api.github.com/users/octocat/followers',
        },
        following_url: {
          type: 'string',
          example:
            'https://api.github.com/users/octocat/following{/other_user}',
        },
        gists_url: {
          type: 'string',
          example: 'https://api.github.com/users/octocat/gists{/gist_id}',
        },
        starred_url: {
          type: 'string',
          example:
            'https://api.github.com/users/octocat/starred{/owner}{/repo}',
        },
        subscriptions_url: {
          type: 'string',
          format: 'uri',
          example: 'https://api.github.com/users/octocat/subscriptions',
        },
        organizations_url: {
          type: 'string',
          format: 'uri',
          example: 'https://api.github.com/users/octocat/orgs',
        },
        repos_url: {
          type: 'string',
          format: 'uri',
          example: 'https://api.github.com/users/octocat/repos',
        },
        events_url: {
          type: 'string',
          example: 'https://api.github.com/users/octocat/events{/privacy}',
        },
        received_events_url: {
          type: 'string',
          format: 'uri',
          example: 'https://api.github.com/users/octocat/received_events',
        },
        type: {
          type: 'string',
          example: 'User',
        },
        site_admin: {
          type: 'boolean',
        },
        name: {
          type: ['string', 'null'],
          example: 'monalisa octocat',
        },
        company: {
          type: ['string', 'null'],
          example: 'GitHub',
        },
        blog: {
          type: ['string', 'null'],
          example: 'https://github.com/blog',
        },
        location: {
          type: ['string', 'null'],
          example: 'San Francisco',
        },
        email: {
          type: ['string', 'null'],
          format: 'email',
          example: 'octocat@github.com',
        },
        notification_email: {
          type: ['string', 'null'],
          format: 'email',
          example: 'octocat@github.com',
        },
        hireable: {
          type: ['boolean', 'null'],
        },
        bio: {
          type: ['string', 'null'],
          example: 'There once was...',
        },
        twitter_username: {
          type: ['string', 'null'],
          example: 'monalisa',
        },
        public_repos: {
          type: 'integer',
          example: 2,
        },
        public_gists: {
          type: 'integer',
          example: 1,
        },
        followers: {
          type: 'integer',
          example: 20,
        },
        following: {
          type: 'integer',
          example: 0,
        },
        created_at: {
          type: 'string',
          format: 'date-time',
          example: '2008-01-14T04:33:35Z',
        },
        updated_at: {
          type: 'string',
          format: 'date-time',
          example: '2008-01-14T04:33:35Z',
        },
        private_gists: {
          type: 'integer',
          example: 81,
        },
        total_private_repos: {
          type: 'integer',
          example: 100,
        },
        owned_private_repos: {
          type: 'integer',
          example: 100,
        },
        disk_usage: {
          type: 'integer',
          example: 10000,
        },
        collaborators: {
          type: 'integer',
          example: 8,
        },
        two_factor_authentication: {
          type: 'boolean',
          example: true,
        },
        plan: {
          type: 'object',
          properties: {
            collaborators: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            space: {
              type: 'integer',
            },
            private_repos: {
              type: 'integer',
            },
          },
          required: ['collaborators', 'name', 'space', 'private_repos'],
        },
        business_plus: {
          type: 'boolean',
        },
        ldap_dn: {
          type: 'string',
        },
      },
      required: [
        'avatar_url',
        'events_url',
        'followers_url',
        'following_url',
        'gists_url',
        'gravatar_id',
        'html_url',
        'id',
        'node_id',
        'login',
        'organizations_url',
        'received_events_url',
        'repos_url',
        'site_admin',
        'starred_url',
        'subscriptions_url',
        'type',
        'url',
        'bio',
        'blog',
        'company',
        'email',
        'followers',
        'following',
        'hireable',
        'location',
        'name',
        'public_gists',
        'public_repos',
        'created_at',
        'updated_at',
        'collaborators',
        'disk_usage',
        'owned_private_repos',
        'private_gists',
        'total_private_repos',
        'two_factor_authentication',
      ],
    },
    {
      title: 'Public User',
      description: 'Public User',
      type: 'object',
      properties: {
        login: {
          type: 'string',
        },
        id: {
          type: 'integer',
          format: 'int64',
        },
        user_view_type: {
          type: 'string',
        },
        node_id: {
          type: 'string',
        },
        avatar_url: {
          type: 'string',
          format: 'uri',
        },
        gravatar_id: {
          type: ['string', 'null'],
        },
        url: {
          type: 'string',
          format: 'uri',
        },
        html_url: {
          type: 'string',
          format: 'uri',
        },
        followers_url: {
          type: 'string',
          format: 'uri',
        },
        following_url: {
          type: 'string',
        },
        gists_url: {
          type: 'string',
        },
        starred_url: {
          type: 'string',
        },
        subscriptions_url: {
          type: 'string',
          format: 'uri',
        },
        organizations_url: {
          type: 'string',
          format: 'uri',
        },
        repos_url: {
          type: 'string',
          format: 'uri',
        },
        events_url: {
          type: 'string',
        },
        received_events_url: {
          type: 'string',
          format: 'uri',
        },
        type: {
          type: 'string',
        },
        site_admin: {
          type: 'boolean',
        },
        name: {
          type: ['string', 'null'],
        },
        company: {
          type: ['string', 'null'],
        },
        blog: {
          type: ['string', 'null'],
        },
        location: {
          type: ['string', 'null'],
        },
        email: {
          type: ['string', 'null'],
          format: 'email',
        },
        notification_email: {
          type: ['string', 'null'],
          format: 'email',
        },
        hireable: {
          type: ['boolean', 'null'],
        },
        bio: {
          type: ['string', 'null'],
        },
        twitter_username: {
          type: ['string', 'null'],
        },
        public_repos: {
          type: 'integer',
        },
        public_gists: {
          type: 'integer',
        },
        followers: {
          type: 'integer',
        },
        following: {
          type: 'integer',
        },
        created_at: {
          type: 'string',
          format: 'date-time',
        },
        updated_at: {
          type: 'string',
          format: 'date-time',
        },
        plan: {
          type: 'object',
          properties: {
            collaborators: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            space: {
              type: 'integer',
            },
            private_repos: {
              type: 'integer',
            },
          },
          required: ['collaborators', 'name', 'space', 'private_repos'],
        },
        private_gists: {
          type: 'integer',
          example: 1,
        },
        total_private_repos: {
          type: 'integer',
          example: 2,
        },
        owned_private_repos: {
          type: 'integer',
          example: 2,
        },
        disk_usage: {
          type: 'integer',
          example: 1,
        },
        collaborators: {
          type: 'integer',
          example: 3,
        },
      },
      required: [
        'avatar_url',
        'events_url',
        'followers_url',
        'following_url',
        'gists_url',
        'gravatar_id',
        'html_url',
        'id',
        'node_id',
        'login',
        'organizations_url',
        'received_events_url',
        'repos_url',
        'site_admin',
        'starred_url',
        'subscriptions_url',
        'type',
        'url',
        'bio',
        'blog',
        'company',
        'email',
        'followers',
        'following',
        'hireable',
        'location',
        'name',
        'public_gists',
        'public_repos',
        'created_at',
        'updated_at',
      ],
      additionalProperties: false,
    },
  ],
  discriminator: {
    propertyName: 'user_view_type',
    mapping: {
      public: '#/components/schemas/public-user',
      private: '#/components/schemas/private-user',
    },
  },
};

function _validateResponse(value: unknown): UsersGetByIdResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersGetById response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersGetByIdResponse;
}

export const USERS_GET_BY_ID = new InjectionToken<
  (accountId: string) => ReturnType<typeof httpResource<UsersGetByIdResponse>>
>('USERS_GET_BY_ID');

export function provideUsersGetById(): FactoryProvider {
  return {
    provide: USERS_GET_BY_ID,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (accountId: string) =>
        httpResource<UsersGetByIdResponse>(
          () => ({
            url: `${base}/user/${accountId}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
