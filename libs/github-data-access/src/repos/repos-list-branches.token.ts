import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListBranchesParams =
  paths['/repos/{owner}/{repo}/branches']['get']['parameters']['query'];

export type ReposListBranchesResponse =
  paths['/repos/{owner}/{repo}/branches']['get']['responses']['200']['content']['application/json'];

export type ReposListBranchesError =
  paths['/repos/{owner}/{repo}/branches']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Short Branch',
    description: 'Short Branch',
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      commit: {
        type: 'object',
        properties: {
          sha: {
            type: 'string',
          },
          url: {
            type: 'string',
            format: 'uri',
          },
        },
        required: ['sha', 'url'],
      },
      protected: {
        type: 'boolean',
      },
      protection: {
        title: 'Branch Protection',
        description: 'Branch Protection',
        type: 'object',
        properties: {
          url: {
            type: 'string',
          },
          enabled: {
            type: 'boolean',
          },
          required_status_checks: {
            title: 'Protected Branch Required Status Check',
            description: 'Protected Branch Required Status Check',
            type: 'object',
            properties: {
              url: {
                type: 'string',
              },
              enforcement_level: {
                type: 'string',
              },
              contexts: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              checks: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    context: {
                      type: 'string',
                    },
                    app_id: {
                      type: ['integer', 'null'],
                    },
                  },
                  required: ['context', 'app_id'],
                },
              },
              contexts_url: {
                type: 'string',
              },
              strict: {
                type: 'boolean',
              },
            },
            required: ['contexts', 'checks'],
          },
          enforce_admins: {
            title: 'Protected Branch Admin Enforced',
            description: 'Protected Branch Admin Enforced',
            type: 'object',
            properties: {
              url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://api.github.com/repos/octocat/Hello-World/branches/master/protection/enforce_admins',
              },
              enabled: {
                type: 'boolean',
                example: true,
              },
            },
            required: ['url', 'enabled'],
          },
          required_pull_request_reviews: {
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
                    description:
                      'The list of users with review dismissal access.',
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
                  },
                  teams: {
                    description:
                      'The list of teams with review dismissal access.',
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
                      'The list of apps with review dismissal access.',
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
                              title: 'Enterprise',
                              description: 'An enterprise on GitHub.',
                              type: 'object',
                              properties: {
                                description: {
                                  description:
                                    'A short description of the enterprise.',
                                  type: ['string', 'null'],
                                },
                                html_url: {
                                  type: 'string',
                                  format: 'uri',
                                  example:
                                    'https://github.com/enterprises/octo-business',
                                },
                                website_url: {
                                  description: "The enterprise's website URL.",
                                  type: ['string', 'null'],
                                  format: 'uri',
                                },
                                id: {
                                  description:
                                    'Unique identifier of the enterprise',
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
                          description:
                            'The set of permissions for the GitHub app',
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
                              title: 'Enterprise',
                              description: 'An enterprise on GitHub.',
                              type: 'object',
                              properties: {
                                description: {
                                  description:
                                    'A short description of the enterprise.',
                                  type: ['string', 'null'],
                                },
                                html_url: {
                                  type: 'string',
                                  format: 'uri',
                                  example:
                                    'https://github.com/enterprises/octo-business',
                                },
                                website_url: {
                                  description: "The enterprise's website URL.",
                                  type: ['string', 'null'],
                                  format: 'uri',
                                },
                                id: {
                                  description:
                                    'Unique identifier of the enterprise',
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
                          description:
                            'The set of permissions for the GitHub app',
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
          },
          restrictions: {
            title: 'Branch Restriction Policy',
            description: 'Branch Restriction Policy',
            type: 'object',
            properties: {
              url: {
                type: 'string',
                format: 'uri',
              },
              users_url: {
                type: 'string',
                format: 'uri',
              },
              teams_url: {
                type: 'string',
                format: 'uri',
              },
              apps_url: {
                type: 'string',
                format: 'uri',
              },
              users: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    login: {
                      type: 'string',
                    },
                    id: {
                      type: 'integer',
                      format: 'int64',
                    },
                    node_id: {
                      type: 'string',
                    },
                    avatar_url: {
                      type: 'string',
                    },
                    gravatar_id: {
                      type: 'string',
                    },
                    url: {
                      type: 'string',
                    },
                    html_url: {
                      type: 'string',
                    },
                    followers_url: {
                      type: 'string',
                    },
                    following_url: {
                      type: 'string',
                    },
                    gists_url: {
                      type: 'string',
                    },
                    starred_url: {
                      type: 'string',
                    },
                    subscriptions_url: {
                      type: 'string',
                    },
                    organizations_url: {
                      type: 'string',
                    },
                    repos_url: {
                      type: 'string',
                    },
                    events_url: {
                      type: 'string',
                    },
                    received_events_url: {
                      type: 'string',
                    },
                    type: {
                      type: 'string',
                    },
                    site_admin: {
                      type: 'boolean',
                    },
                    user_view_type: {
                      type: 'string',
                    },
                  },
                },
              },
              teams: {
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
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                    },
                    slug: {
                      type: 'string',
                    },
                    node_id: {
                      type: 'string',
                    },
                    owner: {
                      type: 'object',
                      properties: {
                        login: {
                          type: 'string',
                        },
                        id: {
                          type: 'integer',
                        },
                        node_id: {
                          type: 'string',
                        },
                        url: {
                          type: 'string',
                        },
                        repos_url: {
                          type: 'string',
                        },
                        events_url: {
                          type: 'string',
                        },
                        hooks_url: {
                          type: 'string',
                        },
                        issues_url: {
                          type: 'string',
                        },
                        members_url: {
                          type: 'string',
                        },
                        public_members_url: {
                          type: 'string',
                        },
                        avatar_url: {
                          type: 'string',
                        },
                        description: {
                          type: 'string',
                        },
                        gravatar_id: {
                          type: 'string',
                          example: '""',
                        },
                        html_url: {
                          type: 'string',
                          example:
                            '"https://github.com/testorg-ea8ec76d71c3af4b"',
                        },
                        followers_url: {
                          type: 'string',
                          example:
                            '"https://api.github.com/users/testorg-ea8ec76d71c3af4b/followers"',
                        },
                        following_url: {
                          type: 'string',
                          example:
                            '"https://api.github.com/users/testorg-ea8ec76d71c3af4b/following{/other_user}"',
                        },
                        gists_url: {
                          type: 'string',
                          example:
                            '"https://api.github.com/users/testorg-ea8ec76d71c3af4b/gists{/gist_id}"',
                        },
                        starred_url: {
                          type: 'string',
                          example:
                            '"https://api.github.com/users/testorg-ea8ec76d71c3af4b/starred{/owner}{/repo}"',
                        },
                        subscriptions_url: {
                          type: 'string',
                          example:
                            '"https://api.github.com/users/testorg-ea8ec76d71c3af4b/subscriptions"',
                        },
                        organizations_url: {
                          type: 'string',
                          example:
                            '"https://api.github.com/users/testorg-ea8ec76d71c3af4b/orgs"',
                        },
                        received_events_url: {
                          type: 'string',
                          example:
                            '"https://api.github.com/users/testorg-ea8ec76d71c3af4b/received_events"',
                        },
                        type: {
                          type: 'string',
                          example: '"Organization"',
                        },
                        site_admin: {
                          type: 'boolean',
                          example: false,
                        },
                        user_view_type: {
                          type: 'string',
                          example: 'public',
                        },
                      },
                    },
                    name: {
                      type: 'string',
                    },
                    client_id: {
                      type: 'string',
                    },
                    description: {
                      type: 'string',
                    },
                    external_url: {
                      type: 'string',
                    },
                    html_url: {
                      type: 'string',
                    },
                    created_at: {
                      type: 'string',
                    },
                    updated_at: {
                      type: 'string',
                    },
                    permissions: {
                      type: 'object',
                      properties: {
                        metadata: {
                          type: 'string',
                        },
                        contents: {
                          type: 'string',
                        },
                        issues: {
                          type: 'string',
                        },
                        single_file: {
                          type: 'string',
                        },
                      },
                    },
                    events: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            required: [
              'url',
              'users_url',
              'teams_url',
              'apps_url',
              'users',
              'teams',
              'apps',
            ],
          },
          required_linear_history: {
            type: 'object',
            properties: {
              enabled: {
                type: 'boolean',
              },
            },
          },
          allow_force_pushes: {
            type: 'object',
            properties: {
              enabled: {
                type: 'boolean',
              },
            },
          },
          allow_deletions: {
            type: 'object',
            properties: {
              enabled: {
                type: 'boolean',
              },
            },
          },
          block_creations: {
            type: 'object',
            properties: {
              enabled: {
                type: 'boolean',
              },
            },
          },
          required_conversation_resolution: {
            type: 'object',
            properties: {
              enabled: {
                type: 'boolean',
              },
            },
          },
          name: {
            type: 'string',
            example: '"branch/with/protection"',
          },
          protection_url: {
            type: 'string',
            example:
              '"https://api.github.com/repos/owner-79e94e2d36b3fd06a32bb213/AAA_Public_Repo/branches/branch/with/protection/protection"',
          },
          required_signatures: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://api.github.com/repos/octocat/Hello-World/branches/master/protection/required_signatures',
              },
              enabled: {
                type: 'boolean',
                example: true,
              },
            },
            required: ['url', 'enabled'],
          },
          lock_branch: {
            type: 'object',
            description:
              'Whether to set the branch as read-only. If this is true, users will not be able to push to the branch.',
            properties: {
              enabled: {
                default: false,
                type: 'boolean',
              },
            },
          },
          allow_fork_syncing: {
            type: 'object',
            description:
              'Whether users can pull changes from upstream when the branch is locked. Set to `true` to allow fork syncing. Set to `false` to prevent fork syncing.',
            properties: {
              enabled: {
                default: false,
                type: 'boolean',
              },
            },
          },
        },
      },
      protection_url: {
        type: 'string',
        format: 'uri',
      },
    },
    required: ['name', 'commit', 'protected'],
  },
};

function _validateResponse(value: unknown): ReposListBranchesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListBranches response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListBranchesResponse;
}

export const REPOS_LIST_BRANCHES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      ReposListBranchesParams | (() => ReposListBranchesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListBranchesResponse>>
>('REPOS_LIST_BRANCHES');

export function provideReposListBranches(): FactoryProvider {
  return {
    provide: REPOS_LIST_BRANCHES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          ReposListBranchesParams | (() => ReposListBranchesParams | undefined),
      ) =>
        httpResource<ReposListBranchesResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/branches`,
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
