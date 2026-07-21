import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateCommitStatusBody = NonNullable<
  paths['/repos/{owner}/{repo}/statuses/{sha}']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateCommitStatusResponse =
  paths['/repos/{owner}/{repo}/statuses/{sha}']['post']['responses']['201']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Status',
  description: 'The status of a commit.',
  type: 'object',
  properties: {
    url: {
      type: 'string',
    },
    avatar_url: {
      type: ['string', 'null'],
    },
    id: {
      type: 'integer',
    },
    node_id: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    description: {
      type: ['string', 'null'],
    },
    target_url: {
      type: ['string', 'null'],
    },
    context: {
      type: 'string',
    },
    created_at: {
      type: 'string',
    },
    updated_at: {
      type: 'string',
    },
    creator: {
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
  },
  required: [
    'url',
    'avatar_url',
    'id',
    'node_id',
    'state',
    'description',
    'target_url',
    'context',
    'created_at',
    'updated_at',
    'creator',
  ],
};

function _validateResponse(value: unknown): ReposCreateCommitStatusResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCreateCommitStatus response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCreateCommitStatusResponse;
}

export const REPOS_CREATE_COMMIT_STATUS = new InjectionToken<
  (
    owner: string,
    repo: string,
    sha: string,
    body: ReposCreateCommitStatusBody | Signal<ReposCreateCommitStatusBody>,
  ) => ReturnType<typeof httpResource<ReposCreateCommitStatusResponse>>
>('REPOS_CREATE_COMMIT_STATUS');

export function provideReposCreateCommitStatus(): FactoryProvider {
  return {
    provide: REPOS_CREATE_COMMIT_STATUS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        sha: string,
        body: ReposCreateCommitStatusBody | Signal<ReposCreateCommitStatusBody>,
      ) =>
        httpResource<ReposCreateCommitStatusResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/statuses/${sha}`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
