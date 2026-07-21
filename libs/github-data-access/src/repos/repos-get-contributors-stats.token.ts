import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetContributorsStatsResponse =
  | paths['/repos/{owner}/{repo}/stats/contributors']['get']['responses']['200']['content']['application/json']
  | paths['/repos/{owner}/{repo}/stats/contributors']['get']['responses']['202']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Contributor Activity',
    description: 'Contributor Activity',
    type: 'object',
    properties: {
      author: {
        title: 'Simple User',
        description: 'A GitHub user.',
        type: ['object', 'null'],
        properties: {
          name: {
            type: ['string', 'null'],
          },
          email: {
            type: ['string', 'null'],
          },
          login: {
            type: 'string',
            example: 'octocat',
          },
          id: {
            type: 'integer',
            format: 'int64',
            example: 1,
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
          starred_at: {
            type: 'string',
            example: '"2020-07-09T00:17:55Z"',
          },
          user_view_type: {
            type: 'string',
            example: 'public',
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
        ],
      },
      total: {
        type: 'integer',
        example: 135,
      },
      weeks: {
        type: 'array',
        example: [
          {
            w: '1367712000',
            a: 6898,
            d: 77,
            c: 10,
          },
        ],
        items: {
          type: 'object',
          properties: {
            w: {
              type: 'integer',
            },
            a: {
              type: 'integer',
            },
            d: {
              type: 'integer',
            },
            c: {
              type: 'integer',
            },
          },
        },
      },
    },
    required: ['author', 'total', 'weeks'],
  },
};

function _validateResponse(value: unknown): ReposGetContributorsStatsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetContributorsStats response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetContributorsStatsResponse;
}

export const REPOS_GET_CONTRIBUTORS_STATS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetContributorsStatsResponse>>
>('REPOS_GET_CONTRIBUTORS_STATS');

export function provideReposGetContributorsStats(): FactoryProvider {
  return {
    provide: REPOS_GET_CONTRIBUTORS_STATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetContributorsStatsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/stats/contributors`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
