import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListReleaseAssetsParams =
  paths['/repos/{owner}/{repo}/releases/{release_id}/assets']['get']['parameters']['query'];

export type ReposListReleaseAssetsResponse =
  paths['/repos/{owner}/{repo}/releases/{release_id}/assets']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Release Asset',
    description: 'Data related to a release.',
    type: 'object',
    properties: {
      url: {
        type: 'string',
        format: 'uri',
      },
      browser_download_url: {
        type: 'string',
        format: 'uri',
      },
      id: {
        type: 'integer',
      },
      node_id: {
        type: 'string',
      },
      name: {
        description: 'The file name of the asset.',
        type: 'string',
        example: 'Team Environment',
      },
      label: {
        type: ['string', 'null'],
      },
      state: {
        description: 'State of the release asset.',
        type: 'string',
        enum: ['uploaded', 'open'],
      },
      content_type: {
        type: 'string',
      },
      size: {
        type: 'integer',
      },
      digest: {
        type: ['string', 'null'],
      },
      download_count: {
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
      uploader: {
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
      'name',
      'content_type',
      'size',
      'digest',
      'state',
      'url',
      'node_id',
      'download_count',
      'label',
      'uploader',
      'browser_download_url',
      'created_at',
      'updated_at',
    ],
  },
};

function _validateResponse(value: unknown): ReposListReleaseAssetsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListReleaseAssets response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListReleaseAssetsResponse;
}

export const REPOS_LIST_RELEASE_ASSETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    releaseId: string,
    params?:
      | ReposListReleaseAssetsParams
      | (() => ReposListReleaseAssetsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListReleaseAssetsResponse>>
>('REPOS_LIST_RELEASE_ASSETS');

export function provideReposListReleaseAssets(): FactoryProvider {
  return {
    provide: REPOS_LIST_RELEASE_ASSETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        releaseId: string,
        params?:
          | ReposListReleaseAssetsParams
          | (() => ReposListReleaseAssetsParams | undefined),
      ) =>
        httpResource<ReposListReleaseAssetsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/releases/${releaseId}/assets`,
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
