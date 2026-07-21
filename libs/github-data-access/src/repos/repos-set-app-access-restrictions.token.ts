import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposSetAppAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['put']['requestBody']
>['content']['application/json'];

export type ReposSetAppAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['put']['responses']['200']['content']['application/json'];

export type ReposSetAppAccessRestrictionsError =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['put']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'GitHub app',
    description:
      'GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.',
    type: ['object', 'null'],
    properties: {
      id: {
        description: 'Unique identifier of the GitHub app',
        example: 37,
        type: 'integer',
      },
      slug: {
        description: 'The slug name of the GitHub app',
        example: 'probot-owners',
        type: 'string',
      },
      node_id: {
        type: 'string',
        example: 'MDExOkludGVncmF0aW9uMQ==',
      },
      client_id: {
        type: 'string',
        example: '"Iv1.25b5d1e65ffc4022"',
      },
      owner: {
        oneOf: [
          {
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
          {
            title: 'Enterprise',
            description: 'An enterprise on GitHub.',
            type: 'object',
            properties: {
              description: {
                description: 'A short description of the enterprise.',
                type: ['string', 'null'],
              },
              html_url: {
                type: 'string',
                format: 'uri',
                example: 'https://github.com/enterprises/octo-business',
              },
              website_url: {
                description: "The enterprise's website URL.",
                type: ['string', 'null'],
                format: 'uri',
              },
              id: {
                description: 'Unique identifier of the enterprise',
                example: 42,
                type: 'integer',
              },
              node_id: {
                type: 'string',
                example: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
              },
              name: {
                description: 'The name of the enterprise.',
                type: 'string',
                example: 'Octo Business',
              },
              slug: {
                description: 'The slug url identifier for the enterprise.',
                type: 'string',
                example: 'octo-business',
              },
              created_at: {
                type: ['string', 'null'],
                format: 'date-time',
                example: '2019-01-26T19:01:12Z',
              },
              updated_at: {
                type: ['string', 'null'],
                format: 'date-time',
                example: '2019-01-26T19:14:43Z',
              },
              avatar_url: {
                type: 'string',
                format: 'uri',
              },
            },
            required: [
              'id',
              'node_id',
              'name',
              'slug',
              'html_url',
              'created_at',
              'updated_at',
              'avatar_url',
            ],
          },
        ],
      },
      name: {
        description: 'The name of the GitHub app',
        example: 'Probot Owners',
        type: 'string',
      },
      description: {
        type: ['string', 'null'],
        example: 'The description of the app.',
      },
      external_url: {
        type: 'string',
        format: 'uri',
        example: 'https://example.com',
      },
      html_url: {
        type: 'string',
        format: 'uri',
        example: 'https://github.com/apps/super-ci',
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2017-07-08T16:18:44-04:00',
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        example: '2017-07-08T16:18:44-04:00',
      },
      permissions: {
        description: 'The set of permissions for the GitHub app',
        type: 'object',
        properties: {
          issues: {
            type: 'string',
          },
          checks: {
            type: 'string',
          },
          metadata: {
            type: 'string',
          },
          contents: {
            type: 'string',
          },
          deployments: {
            type: 'string',
          },
        },
        additionalProperties: {
          type: 'string',
        },
        example: {
          issues: 'read',
          deployments: 'write',
        },
      },
      events: {
        description:
          'The list of events for the GitHub app. Note that the `installation_target`, `security_advisory`, and `meta` events are not included because they are global events and not specific to an installation.',
        example: ['label', 'deployment'],
        type: 'array',
        items: {
          type: 'string',
        },
      },
      installations_count: {
        description:
          'The number of installations associated with the GitHub app. Only returned when the integration is requesting details about itself.',
        example: 5,
        type: 'integer',
      },
    },
    required: [
      'id',
      'node_id',
      'owner',
      'name',
      'description',
      'external_url',
      'html_url',
      'created_at',
      'updated_at',
      'permissions',
      'events',
    ],
  },
};

function _validateResponse(
  value: unknown,
): ReposSetAppAccessRestrictionsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposSetAppAccessRestrictions response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposSetAppAccessRestrictionsResponse;
}

export const REPOS_SET_APP_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposSetAppAccessRestrictionsBody
      | Signal<ReposSetAppAccessRestrictionsBody>,
  ) => ReturnType<typeof httpResource<ReposSetAppAccessRestrictionsResponse>>
>('REPOS_SET_APP_ACCESS_RESTRICTIONS');

export function provideReposSetAppAccessRestrictions(): FactoryProvider {
  return {
    provide: REPOS_SET_APP_ACCESS_RESTRICTIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposSetAppAccessRestrictionsBody
          | Signal<ReposSetAppAccessRestrictionsBody>,
      ) =>
        httpResource<ReposSetAppAccessRestrictionsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
            method: 'PUT',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
