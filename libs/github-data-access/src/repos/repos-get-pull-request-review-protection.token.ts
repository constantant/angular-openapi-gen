import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetPullRequestReviewProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Protected Branch Pull Request Review',
  description: 'Protected Branch Pull Request Review',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
      example:
        'https://api.github.com/repos/octocat/Hello-World/branches/master/protection/dismissal_restrictions',
    },
    dismissal_restrictions: {
      type: 'object',
      properties: {
        users: {
          description: 'The list of users with review dismissal access.',
          type: 'array',
          items: {
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
        },
        teams: {
          description: 'The list of teams with review dismissal access.',
          type: 'array',
          items: {
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
                required: ['pull', 'triage', 'push', 'maintain', 'admin'],
              },
              url: {
                type: 'string',
                format: 'uri',
              },
              html_url: {
                type: 'string',
                format: 'uri',
                example: 'https://github.com/orgs/rails/teams/core',
              },
              members_url: {
                type: 'string',
              },
              repositories_url: {
                type: 'string',
                format: 'uri',
              },
              type: {
                description: 'The ownership type of the team',
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
                    description: 'Unique identifier of the team',
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
                    example: 'https://api.github.com/organizations/1/team/1',
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
                    description: 'The level of privacy this team should have',
                    type: 'string',
                    example: 'closed',
                  },
                  notification_setting: {
                    description: 'The notification setting the team has set',
                    type: 'string',
                    example: 'notifications_enabled',
                  },
                  html_url: {
                    type: 'string',
                    format: 'uri',
                    example: 'https://github.com/orgs/rails/teams/core',
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
                    example: 'uid=example,ou=users,dc=github,dc=com',
                    type: 'string',
                  },
                  type: {
                    description: 'The ownership type of the team',
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
        },
        apps: {
          description: 'The list of apps with review dismissal access.',
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
                        description:
                          'The slug url identifier for the enterprise.',
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
        },
        url: {
          type: 'string',
          example:
            '"https://api.github.com/repos/the-org/an-org-repo/branches/master/protection/dismissal_restrictions"',
        },
        users_url: {
          type: 'string',
          example:
            '"https://api.github.com/repos/the-org/an-org-repo/branches/master/protection/dismissal_restrictions/users"',
        },
        teams_url: {
          type: 'string',
          example:
            '"https://api.github.com/repos/the-org/an-org-repo/branches/master/protection/dismissal_restrictions/teams"',
        },
      },
    },
    bypass_pull_request_allowances: {
      type: 'object',
      description:
        'Allow specific users, teams, or apps to bypass pull request requirements.',
      properties: {
        users: {
          description:
            'The list of users allowed to bypass pull request requirements.',
          type: 'array',
          items: {
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
        },
        teams: {
          description:
            'The list of teams allowed to bypass pull request requirements.',
          type: 'array',
          items: {
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
                required: ['pull', 'triage', 'push', 'maintain', 'admin'],
              },
              url: {
                type: 'string',
                format: 'uri',
              },
              html_url: {
                type: 'string',
                format: 'uri',
                example: 'https://github.com/orgs/rails/teams/core',
              },
              members_url: {
                type: 'string',
              },
              repositories_url: {
                type: 'string',
                format: 'uri',
              },
              type: {
                description: 'The ownership type of the team',
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
                    description: 'Unique identifier of the team',
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
                    example: 'https://api.github.com/organizations/1/team/1',
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
                    description: 'The level of privacy this team should have',
                    type: 'string',
                    example: 'closed',
                  },
                  notification_setting: {
                    description: 'The notification setting the team has set',
                    type: 'string',
                    example: 'notifications_enabled',
                  },
                  html_url: {
                    type: 'string',
                    format: 'uri',
                    example: 'https://github.com/orgs/rails/teams/core',
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
                    example: 'uid=example,ou=users,dc=github,dc=com',
                    type: 'string',
                  },
                  type: {
                    description: 'The ownership type of the team',
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
        },
        apps: {
          description:
            'The list of apps allowed to bypass pull request requirements.',
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
                        description:
                          'The slug url identifier for the enterprise.',
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
        },
      },
    },
    dismiss_stale_reviews: {
      type: 'boolean',
      example: true,
    },
    require_code_owner_reviews: {
      type: 'boolean',
      example: true,
    },
    required_approving_review_count: {
      type: 'integer',
      minimum: 0,
      maximum: 6,
      example: 2,
    },
    require_last_push_approval: {
      description:
        'Whether the most recent push must be approved by someone other than the person who pushed it.',
      type: 'boolean',
      example: true,
      default: false,
    },
  },
  required: ['dismiss_stale_reviews', 'require_code_owner_reviews'],
};

function _validateResponse(
  value: unknown,
): ReposGetPullRequestReviewProtectionResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetPullRequestReviewProtection response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetPullRequestReviewProtectionResponse;
}

export const REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<
    typeof httpResource<ReposGetPullRequestReviewProtectionResponse>
  >
>('REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION');

export function provideReposGetPullRequestReviewProtection(): FactoryProvider {
  return {
    provide: REPOS_GET_PULL_REQUEST_REVIEW_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetPullRequestReviewProtectionResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_pull_request_reviews`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
