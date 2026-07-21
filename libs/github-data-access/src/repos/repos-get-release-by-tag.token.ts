import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetReleaseByTagResponse =
  paths['/repos/{owner}/{repo}/releases/tags/{tag}']['get']['responses']['200']['content']['application/json'];

export type ReposGetReleaseByTagError =
  paths['/repos/{owner}/{repo}/releases/tags/{tag}']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Release',
  description: 'A release.',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
    },
    html_url: {
      type: 'string',
      format: 'uri',
    },
    assets_url: {
      type: 'string',
      format: 'uri',
    },
    upload_url: {
      type: 'string',
    },
    tarball_url: {
      type: ['string', 'null'],
      format: 'uri',
    },
    zipball_url: {
      type: ['string', 'null'],
      format: 'uri',
    },
    id: {
      type: 'integer',
    },
    node_id: {
      type: 'string',
    },
    tag_name: {
      description: 'The name of the tag.',
      example: 'v1.0.0',
      type: 'string',
    },
    target_commitish: {
      description:
        'Specifies the commitish value that determines where the Git tag is created from.',
      example: 'master',
      type: 'string',
    },
    name: {
      type: ['string', 'null'],
    },
    body: {
      type: ['string', 'null'],
    },
    draft: {
      description:
        'true to create a draft (unpublished) release, false to create a published one.',
      example: false,
      type: 'boolean',
    },
    prerelease: {
      description:
        'Whether to identify the release as a prerelease or a full release.',
      example: false,
      type: 'boolean',
    },
    immutable: {
      description: 'Whether or not the release is immutable.',
      example: false,
      type: 'boolean',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
    },
    published_at: {
      type: ['string', 'null'],
      format: 'date-time',
    },
    updated_at: {
      type: ['string', 'null'],
      format: 'date-time',
    },
    author: {
      title: 'Simple User',
      description: 'A GitHub user.',
      type: 'object',
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
    assets: {
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
                example:
                  'https://api.github.com/users/octocat/events{/privacy}',
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
    },
    body_html: {
      type: 'string',
    },
    body_text: {
      type: 'string',
    },
    mentions_count: {
      type: 'integer',
    },
    discussion_url: {
      description: 'The URL of the release discussion.',
      type: 'string',
      format: 'uri',
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
    'assets_url',
    'upload_url',
    'tarball_url',
    'zipball_url',
    'created_at',
    'published_at',
    'draft',
    'id',
    'node_id',
    'author',
    'html_url',
    'name',
    'prerelease',
    'tag_name',
    'target_commitish',
    'assets',
    'url',
  ],
};

function _validateResponse(value: unknown): ReposGetReleaseByTagResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetReleaseByTag response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetReleaseByTagResponse;
}

export const REPOS_GET_RELEASE_BY_TAG = new InjectionToken<
  (
    owner: string,
    repo: string,
    tag: string,
  ) => ReturnType<typeof httpResource<ReposGetReleaseByTagResponse>>
>('REPOS_GET_RELEASE_BY_TAG');

export function provideReposGetReleaseByTag(): FactoryProvider {
  return {
    provide: REPOS_GET_RELEASE_BY_TAG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, tag: string) =>
        httpResource<ReposGetReleaseByTagResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/releases/tags/${tag}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
