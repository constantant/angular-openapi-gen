import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListActivitiesParams =
  paths['/repos/{owner}/{repo}/activity']['get']['parameters']['query'];

export type ReposListActivitiesResponse =
  paths['/repos/{owner}/{repo}/activity']['get']['responses']['200']['content']['application/json'];

export type ReposListActivitiesError =
  paths['/repos/{owner}/{repo}/activity']['get']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Activity',
    description: 'Activity',
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1296269,
      },
      node_id: {
        type: 'string',
        example: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
      },
      before: {
        type: 'string',
        example: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
        description: 'The SHA of the commit before the activity.',
      },
      after: {
        type: 'string',
        example: '827efc6d56897b048c772eb4087f854f46256132',
        description: 'The SHA of the commit after the activity.',
      },
      ref: {
        type: 'string',
        example: 'refs/heads/main',
        description:
          'The full Git reference, formatted as `refs/heads/<branch name>`.',
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        example: '2011-01-26T19:06:43Z',
        description: 'The time when the activity occurred.',
      },
      activity_type: {
        type: 'string',
        example: 'force_push',
        enum: [
          'push',
          'force_push',
          'branch_deletion',
          'branch_creation',
          'pr_merge',
          'merge_queue_merge',
        ],
        description: 'The type of the activity that was performed.',
      },
      actor: {
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
      'id',
      'node_id',
      'before',
      'after',
      'ref',
      'timestamp',
      'activity_type',
      'actor',
    ],
  },
};

function _validateResponse(value: unknown): ReposListActivitiesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListActivities response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListActivitiesResponse;
}

export const REPOS_LIST_ACTIVITIES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      ReposListActivitiesParams | (() => ReposListActivitiesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListActivitiesResponse>>
>('REPOS_LIST_ACTIVITIES');

export function provideReposListActivities(): FactoryProvider {
  return {
    provide: REPOS_LIST_ACTIVITIES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListActivitiesParams
          | (() => ReposListActivitiesParams | undefined),
      ) =>
        httpResource<ReposListActivitiesResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/activity`,
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
