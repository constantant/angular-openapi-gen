import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersUpdateAuthenticatedBody = NonNullable<
  paths['/user']['patch']['requestBody']
>['content']['application/json'];

export type UsersUpdateAuthenticatedResponse =
  paths['/user']['patch']['responses']['200']['content']['application/json'];

export type UsersUpdateAuthenticatedError =
  | paths['/user']['patch']['responses']['401']['content']['application/json']
  | paths['/user']['patch']['responses']['403']['content']['application/json']
  | paths['/user']['patch']['responses']['404']['content']['application/json']
  | paths['/user']['patch']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
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
      example: 'https://api.github.com/users/octocat/following{/other_user}',
    },
    gists_url: {
      type: 'string',
      example: 'https://api.github.com/users/octocat/gists{/gist_id}',
    },
    starred_url: {
      type: 'string',
      example: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
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
};

function _validateResponse(value: unknown): UsersUpdateAuthenticatedResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UsersUpdateAuthenticated response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UsersUpdateAuthenticatedResponse;
}

export const USERS_UPDATE_AUTHENTICATED = new InjectionToken<
  (
    body: UsersUpdateAuthenticatedBody | Signal<UsersUpdateAuthenticatedBody>,
  ) => ReturnType<typeof httpResource<UsersUpdateAuthenticatedResponse>>
>('USERS_UPDATE_AUTHENTICATED');

export function provideUsersUpdateAuthenticated(): FactoryProvider {
  return {
    provide: USERS_UPDATE_AUTHENTICATED,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        body:
          UsersUpdateAuthenticatedBody | Signal<UsersUpdateAuthenticatedBody>,
      ) =>
        httpResource<UsersUpdateAuthenticatedResponse>(
          () => ({
            url: `${base}/user`,
            method: 'PATCH',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
