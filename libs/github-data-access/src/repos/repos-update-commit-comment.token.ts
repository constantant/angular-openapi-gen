import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateCommitCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/comments/{comment_id}']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdateCommitCommentResponse =
  paths['/repos/{owner}/{repo}/comments/{comment_id}']['patch']['responses']['200']['content']['application/json'];

export type ReposUpdateCommitCommentError =
  paths['/repos/{owner}/{repo}/comments/{comment_id}']['patch']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Commit Comment',
  description: 'Commit Comment',
  type: 'object',
  properties: {
    html_url: {
      type: 'string',
      format: 'uri',
    },
    url: {
      type: 'string',
      format: 'uri',
    },
    id: {
      type: 'integer',
    },
    node_id: {
      type: 'string',
    },
    body: {
      type: 'string',
    },
    path: {
      type: ['string', 'null'],
    },
    position: {
      type: ['integer', 'null'],
    },
    line: {
      type: ['integer', 'null'],
    },
    commit_id: {
      type: 'string',
    },
    user: {
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
    created_at: {
      type: 'string',
      format: 'date-time',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
    },
    author_association: {
      title: 'author_association',
      type: 'string',
      example: 'OWNER',
      description: 'How the author is associated with the repository.',
      enum: [
        'COLLABORATOR',
        'CONTRIBUTOR',
        'FIRST_TIMER',
        'FIRST_TIME_CONTRIBUTOR',
        'MANNEQUIN',
        'MEMBER',
        'NONE',
        'OWNER',
      ],
    },
    reactions: {
      title: 'Reaction Rollup',
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'uri',
        },
        total_count: {
          type: 'integer',
        },
        '+1': {
          type: 'integer',
        },
        '-1': {
          type: 'integer',
        },
        laugh: {
          type: 'integer',
        },
        confused: {
          type: 'integer',
        },
        heart: {
          type: 'integer',
        },
        hooray: {
          type: 'integer',
        },
        eyes: {
          type: 'integer',
        },
        rocket: {
          type: 'integer',
        },
      },
      required: [
        'url',
        'total_count',
        '+1',
        '-1',
        'laugh',
        'confused',
        'heart',
        'hooray',
        'eyes',
        'rocket',
      ],
    },
  },
  required: [
    'url',
    'html_url',
    'id',
    'node_id',
    'user',
    'position',
    'line',
    'path',
    'commit_id',
    'body',
    'author_association',
    'created_at',
    'updated_at',
  ],
};

function _validateResponse(value: unknown): ReposUpdateCommitCommentResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposUpdateCommitComment response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposUpdateCommitCommentResponse;
}

export const REPOS_UPDATE_COMMIT_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commentId: string,
    body: ReposUpdateCommitCommentBody | Signal<ReposUpdateCommitCommentBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateCommitCommentResponse>>
>('REPOS_UPDATE_COMMIT_COMMENT');

export function provideReposUpdateCommitComment(): FactoryProvider {
  return {
    provide: REPOS_UPDATE_COMMIT_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        commentId: string,
        body:
          ReposUpdateCommitCommentBody | Signal<ReposUpdateCommitCommentBody>,
      ) =>
        httpResource<ReposUpdateCommitCommentResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/comments/${commentId}`,
            method: 'PATCH',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
