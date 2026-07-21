import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetAllEnvironmentsParams =
  paths['/repos/{owner}/{repo}/environments']['get']['parameters']['query'];

export type ReposGetAllEnvironmentsResponse =
  paths['/repos/{owner}/{repo}/environments']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    total_count: {
      description: 'The number of environments in this repository',
      example: 5,
      type: 'integer',
    },
    environments: {
      type: 'array',
      items: {
        title: 'Environment',
        description: 'Details of a deployment environment',
        type: 'object',
        properties: {
          id: {
            description: 'The id of the environment.',
            example: 56780428,
            type: 'integer',
            format: 'int64',
          },
          node_id: {
            type: 'string',
            example: 'MDExOkVudmlyb25tZW50NTY3ODA0Mjg=',
          },
          name: {
            description: 'The name of the environment.',
            example: 'staging',
            type: 'string',
          },
          url: {
            type: 'string',
            example:
              'https://api.github.com/repos/github/hello-world/environments/staging',
          },
          html_url: {
            type: 'string',
            example:
              'https://github.com/github/hello-world/deployments/activity_log?environments_filter=staging',
          },
          created_at: {
            description:
              'The time that the environment was created, in ISO 8601 format.',
            example: '2020-11-23T22:00:40Z',
            format: 'date-time',
            type: 'string',
          },
          updated_at: {
            description:
              'The time that the environment was last updated, in ISO 8601 format.',
            example: '2020-11-23T22:00:40Z',
            format: 'date-time',
            type: 'string',
          },
          protection_rules: {
            type: 'array',
            description:
              'Built-in deployment protection rules for the environment.',
            items: {
              anyOf: [
                {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 3515,
                    },
                    node_id: {
                      type: 'string',
                      example: 'MDQ6R2F0ZTM1MTU=',
                    },
                    type: {
                      type: 'string',
                      example: 'wait_timer',
                    },
                    wait_timer: {
                      type: 'integer',
                      example: 30,
                      description:
                        'The amount of time to delay a job after the job is initially triggered. The time (in minutes) must be an integer between 0 and 43,200 (30 days).',
                    },
                  },
                  required: ['id', 'node_id', 'type'],
                },
                {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 3755,
                    },
                    node_id: {
                      type: 'string',
                      example: 'MDQ6R2F0ZTM3NTU=',
                    },
                    prevent_self_review: {
                      type: 'boolean',
                      example: false,
                      description:
                        'Whether deployments to this environment can be approved by the user who created the deployment.',
                    },
                    type: {
                      type: 'string',
                      example: 'required_reviewers',
                    },
                    reviewers: {
                      type: 'array',
                      description:
                        'The people or teams that may approve jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed.',
                      items: {
                        type: 'object',
                        properties: {
                          type: {
                            type: 'string',
                            description: 'The type of reviewer.',
                            enum: ['User', 'Team'],
                            example: 'User',
                          },
                          reviewer: {
                            anyOf: [
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
                                    example:
                                      'https://github.com/images/error/octocat_happy.gif',
                                  },
                                  gravatar_id: {
                                    type: ['string', 'null'],
                                    example: '41d064eb2195891e12d0413f63227ea7',
                                  },
                                  url: {
                                    type: 'string',
                                    format: 'uri',
                                    example:
                                      'https://api.github.com/users/octocat',
                                  },
                                  html_url: {
                                    type: 'string',
                                    format: 'uri',
                                    example: 'https://github.com/octocat',
                                  },
                                  followers_url: {
                                    type: 'string',
                                    format: 'uri',
                                    example:
                                      'https://api.github.com/users/octocat/followers',
                                  },
                                  following_url: {
                                    type: 'string',
                                    example:
                                      'https://api.github.com/users/octocat/following{/other_user}',
                                  },
                                  gists_url: {
                                    type: 'string',
                                    example:
                                      'https://api.github.com/users/octocat/gists{/gist_id}',
                                  },
                                  starred_url: {
                                    type: 'string',
                                    example:
                                      'https://api.github.com/users/octocat/starred{/owner}{/repo}',
                                  },
                                  subscriptions_url: {
                                    type: 'string',
                                    format: 'uri',
                                    example:
                                      'https://api.github.com/users/octocat/subscriptions',
                                  },
                                  organizations_url: {
                                    type: 'string',
                                    format: 'uri',
                                    example:
                                      'https://api.github.com/users/octocat/orgs',
                                  },
                                  repos_url: {
                                    type: 'string',
                                    format: 'uri',
                                    example:
                                      'https://api.github.com/users/octocat/repos',
                                  },
                                  events_url: {
                                    type: 'string',
                                    example:
                                      'https://api.github.com/users/octocat/events{/privacy}',
                                  },
                                  received_events_url: {
                                    type: 'string',
                                    format: 'uri',
                                    example:
                                      'https://api.github.com/users/octocat/received_events',
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
                                title: 'Team',
                                description:
                                  'Groups of organization members that gives permissions on specified repositories.',
                                type: 'object',
                                properties: {
                                  id: {
                                    type: 'integer',
                                  },
                                  node_id: {
                                    type: 'string',
                                  },
                                  name: {
                                    type: 'string',
                                  },
                                  slug: {
                                    type: 'string',
                                  },
                                  description: {
                                    type: ['string', 'null'],
                                  },
                                  privacy: {
                                    type: 'string',
                                  },
                                  notification_setting: {
                                    type: 'string',
                                  },
                                  permission: {
                                    type: 'string',
                                  },
                                  permissions: {
                                    type: 'object',
                                    properties: {
                                      pull: {
                                        type: 'boolean',
                                      },
                                      triage: {
                                        type: 'boolean',
                                      },
                                      push: {
                                        type: 'boolean',
                                      },
                                      maintain: {
                                        type: 'boolean',
                                      },
                                      admin: {
                                        type: 'boolean',
                                      },
                                    },
                                    required: [
                                      'pull',
                                      'triage',
                                      'push',
                                      'maintain',
                                      'admin',
                                    ],
                                  },
                                  url: {
                                    type: 'string',
                                    format: 'uri',
                                  },
                                  html_url: {
                                    type: 'string',
                                    format: 'uri',
                                    example:
                                      'https://github.com/orgs/rails/teams/core',
                                  },
                                  members_url: {
                                    type: 'string',
                                  },
                                  repositories_url: {
                                    type: 'string',
                                    format: 'uri',
                                  },
                                  type: {
                                    description:
                                      'The ownership type of the team',
                                    type: 'string',
                                    enum: ['enterprise', 'organization'],
                                  },
                                  organization_id: {
                                    type: 'integer',
                                    description:
                                      'Unique identifier of the organization to which this team belongs',
                                    example: 37,
                                  },
                                  enterprise_id: {
                                    type: 'integer',
                                    description:
                                      'Unique identifier of the enterprise to which this team belongs',
                                    example: 42,
                                  },
                                  parent: {
                                    title: 'Team Simple',
                                    description:
                                      'Groups of organization members that gives permissions on specified repositories.',
                                    type: ['object', 'null'],
                                    properties: {
                                      id: {
                                        description:
                                          'Unique identifier of the team',
                                        type: 'integer',
                                        example: 1,
                                      },
                                      node_id: {
                                        type: 'string',
                                        example: 'MDQ6VGVhbTE=',
                                      },
                                      url: {
                                        description: 'URL for the team',
                                        type: 'string',
                                        format: 'uri',
                                        example:
                                          'https://api.github.com/organizations/1/team/1',
                                      },
                                      members_url: {
                                        type: 'string',
                                        example:
                                          'https://api.github.com/organizations/1/team/1/members{/member}',
                                      },
                                      name: {
                                        description: 'Name of the team',
                                        type: 'string',
                                        example: 'Justice League',
                                      },
                                      description: {
                                        description: 'Description of the team',
                                        type: ['string', 'null'],
                                        example: 'A great team.',
                                      },
                                      permission: {
                                        description:
                                          'Permission that the team will have for its repositories',
                                        type: 'string',
                                        example: 'admin',
                                      },
                                      privacy: {
                                        description:
                                          'The level of privacy this team should have',
                                        type: 'string',
                                        example: 'closed',
                                      },
                                      notification_setting: {
                                        description:
                                          'The notification setting the team has set',
                                        type: 'string',
                                        example: 'notifications_enabled',
                                      },
                                      html_url: {
                                        type: 'string',
                                        format: 'uri',
                                        example:
                                          'https://github.com/orgs/rails/teams/core',
                                      },
                                      repositories_url: {
                                        type: 'string',
                                        format: 'uri',
                                        example:
                                          'https://api.github.com/organizations/1/team/1/repos',
                                      },
                                      slug: {
                                        type: 'string',
                                        example: 'justice-league',
                                      },
                                      ldap_dn: {
                                        description:
                                          'Distinguished Name (DN) that team maps to within LDAP environment',
                                        example:
                                          'uid=example,ou=users,dc=github,dc=com',
                                        type: 'string',
                                      },
                                      type: {
                                        description:
                                          'The ownership type of the team',
                                        type: 'string',
                                        enum: ['enterprise', 'organization'],
                                      },
                                      organization_id: {
                                        type: 'integer',
                                        description:
                                          'Unique identifier of the organization to which this team belongs',
                                        example: 37,
                                      },
                                      enterprise_id: {
                                        type: 'integer',
                                        description:
                                          'Unique identifier of the enterprise to which this team belongs',
                                        example: 42,
                                      },
                                    },
                                    required: [
                                      'id',
                                      'node_id',
                                      'url',
                                      'members_url',
                                      'name',
                                      'description',
                                      'permission',
                                      'html_url',
                                      'repositories_url',
                                      'slug',
                                      'type',
                                    ],
                                  },
                                },
                                required: [
                                  'id',
                                  'node_id',
                                  'url',
                                  'members_url',
                                  'name',
                                  'description',
                                  'permission',
                                  'html_url',
                                  'repositories_url',
                                  'slug',
                                  'parent',
                                  'type',
                                ],
                              },
                            ],
                          },
                        },
                      },
                    },
                  },
                  required: ['id', 'node_id', 'type'],
                },
                {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 3515,
                    },
                    node_id: {
                      type: 'string',
                      example: 'MDQ6R2F0ZTM1MTU=',
                    },
                    type: {
                      type: 'string',
                      example: 'branch_policy',
                    },
                  },
                  required: ['id', 'node_id', 'type'],
                },
              ],
            },
          },
          deployment_branch_policy: {
            type: ['object', 'null'],
            description:
              'The type of deployment branch policy for this environment. To allow all branches to deploy, set to `null`.',
            properties: {
              protected_branches: {
                type: 'boolean',
                description:
                  'Whether only branches with branch protection rules can deploy to this environment. If `protected_branches` is `true`, `custom_branch_policies` must be `false`; if `protected_branches` is `false`, `custom_branch_policies` must be `true`.',
              },
              custom_branch_policies: {
                type: 'boolean',
                description:
                  'Whether only branches that match the specified name patterns can deploy to this environment.  If `custom_branch_policies` is `true`, `protected_branches` must be `false`; if `custom_branch_policies` is `false`, `protected_branches` must be `true`.',
              },
            },
            required: ['protected_branches', 'custom_branch_policies'],
          },
        },
        required: [
          'id',
          'node_id',
          'name',
          'url',
          'html_url',
          'created_at',
          'updated_at',
        ],
      },
    },
  },
};

function _validateResponse(value: unknown): ReposGetAllEnvironmentsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetAllEnvironments response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetAllEnvironmentsResponse;
}

export const REPOS_GET_ALL_ENVIRONMENTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposGetAllEnvironmentsParams
      | (() => ReposGetAllEnvironmentsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetAllEnvironmentsResponse>>
>('REPOS_GET_ALL_ENVIRONMENTS');

export function provideReposGetAllEnvironments(): FactoryProvider {
  return {
    provide: REPOS_GET_ALL_ENVIRONMENTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposGetAllEnvironmentsParams
          | (() => ReposGetAllEnvironmentsParams | undefined),
      ) =>
        httpResource<ReposGetAllEnvironmentsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/environments`,
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
