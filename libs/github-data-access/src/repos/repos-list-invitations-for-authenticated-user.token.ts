import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListInvitationsForAuthenticatedUserParams =
  paths['/user/repository_invitations']['get']['parameters']['query'];

export type ReposListInvitationsForAuthenticatedUserResponse =
  paths['/user/repository_invitations']['get']['responses']['200']['content']['application/json'];

export type ReposListInvitationsForAuthenticatedUserError =
  | paths['/user/repository_invitations']['get']['responses']['401']['content']['application/json']
  | paths['/user/repository_invitations']['get']['responses']['403']['content']['application/json']
  | paths['/user/repository_invitations']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Repository Invitation',
    description:
      'Repository invitations let you manage who you collaborate with.',
    type: 'object',
    properties: {
      id: {
        description: 'Unique identifier of the repository invitation.',
        example: 42,
        type: 'integer',
        format: 'int64',
      },
      repository: {
        title: 'Minimal Repository',
        description: 'Minimal Repository',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            example: 1296269,
          },
          node_id: {
            type: 'string',
            example: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
          },
          name: {
            type: 'string',
            example: 'Hello-World',
          },
          full_name: {
            type: 'string',
            example: 'octocat/Hello-World',
          },
          owner: {
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
          private: {
            type: 'boolean',
          },
          html_url: {
            type: 'string',
            format: 'uri',
            example: 'https://github.com/octocat/Hello-World',
          },
          description: {
            type: ['string', 'null'],
            example: 'This your first repo!',
          },
          fork: {
            type: 'boolean',
          },
          url: {
            type: 'string',
            format: 'uri',
            example: 'https://api.github.com/repos/octocat/Hello-World',
          },
          archive_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}',
          },
          assignees_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/assignees{/user}',
          },
          blobs_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}',
          },
          branches_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/branches{/branch}',
          },
          collaborators_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}',
          },
          comments_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/comments{/number}',
          },
          commits_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/commits{/sha}',
          },
          compare_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}',
          },
          contents_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/contents/{+path}',
          },
          contributors_url: {
            type: 'string',
            format: 'uri',
            example:
              'http://api.github.com/repos/octocat/Hello-World/contributors',
          },
          deployments_url: {
            type: 'string',
            format: 'uri',
            example:
              'http://api.github.com/repos/octocat/Hello-World/deployments',
          },
          downloads_url: {
            type: 'string',
            format: 'uri',
            example:
              'http://api.github.com/repos/octocat/Hello-World/downloads',
          },
          events_url: {
            type: 'string',
            format: 'uri',
            example: 'http://api.github.com/repos/octocat/Hello-World/events',
          },
          forks_url: {
            type: 'string',
            format: 'uri',
            example: 'http://api.github.com/repos/octocat/Hello-World/forks',
          },
          git_commits_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}',
          },
          git_refs_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}',
          },
          git_tags_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}',
          },
          git_url: {
            type: 'string',
          },
          issue_comment_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}',
          },
          issue_events_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/issues/events{/number}',
          },
          issues_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/issues{/number}',
          },
          keys_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/keys{/key_id}',
          },
          labels_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/labels{/name}',
          },
          languages_url: {
            type: 'string',
            format: 'uri',
            example:
              'http://api.github.com/repos/octocat/Hello-World/languages',
          },
          merges_url: {
            type: 'string',
            format: 'uri',
            example: 'http://api.github.com/repos/octocat/Hello-World/merges',
          },
          milestones_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/milestones{/number}',
          },
          notifications_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}',
          },
          pulls_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/pulls{/number}',
          },
          releases_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/releases{/id}',
          },
          ssh_url: {
            type: 'string',
          },
          stargazers_url: {
            type: 'string',
            format: 'uri',
            example:
              'http://api.github.com/repos/octocat/Hello-World/stargazers',
          },
          statuses_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/statuses/{sha}',
          },
          subscribers_url: {
            type: 'string',
            format: 'uri',
            example:
              'http://api.github.com/repos/octocat/Hello-World/subscribers',
          },
          subscription_url: {
            type: 'string',
            format: 'uri',
            example:
              'http://api.github.com/repos/octocat/Hello-World/subscription',
          },
          tags_url: {
            type: 'string',
            format: 'uri',
            example: 'http://api.github.com/repos/octocat/Hello-World/tags',
          },
          teams_url: {
            type: 'string',
            format: 'uri',
            example: 'http://api.github.com/repos/octocat/Hello-World/teams',
          },
          trees_url: {
            type: 'string',
            example:
              'http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}',
          },
          clone_url: {
            type: 'string',
          },
          mirror_url: {
            type: ['string', 'null'],
          },
          hooks_url: {
            type: 'string',
            format: 'uri',
            example: 'http://api.github.com/repos/octocat/Hello-World/hooks',
          },
          svn_url: {
            type: 'string',
          },
          homepage: {
            type: ['string', 'null'],
          },
          language: {
            type: ['string', 'null'],
          },
          forks_count: {
            type: 'integer',
          },
          stargazers_count: {
            type: 'integer',
          },
          watchers_count: {
            type: 'integer',
          },
          size: {
            description:
              'The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.',
            type: 'integer',
          },
          default_branch: {
            type: 'string',
          },
          open_issues_count: {
            type: 'integer',
          },
          is_template: {
            type: 'boolean',
          },
          topics: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          has_issues: {
            type: 'boolean',
          },
          has_projects: {
            type: 'boolean',
          },
          has_wiki: {
            type: 'boolean',
          },
          has_pages: {
            type: 'boolean',
          },
          has_downloads: {
            type: 'boolean',
          },
          has_discussions: {
            type: 'boolean',
          },
          has_pull_requests: {
            type: 'boolean',
          },
          pull_request_creation_policy: {
            description:
              'The policy controlling who can create pull requests: all or collaborators_only.',
            type: 'string',
            enum: ['all', 'collaborators_only'],
          },
          archived: {
            type: 'boolean',
          },
          disabled: {
            type: 'boolean',
          },
          visibility: {
            type: 'string',
          },
          pushed_at: {
            type: ['string', 'null'],
            format: 'date-time',
            example: '2011-01-26T19:06:43Z',
          },
          created_at: {
            type: ['string', 'null'],
            format: 'date-time',
            example: '2011-01-26T19:01:12Z',
          },
          updated_at: {
            type: ['string', 'null'],
            format: 'date-time',
            example: '2011-01-26T19:14:43Z',
          },
          permissions: {
            type: 'object',
            properties: {
              admin: {
                type: 'boolean',
              },
              maintain: {
                type: 'boolean',
              },
              push: {
                type: 'boolean',
              },
              triage: {
                type: 'boolean',
              },
              pull: {
                type: 'boolean',
              },
            },
          },
          role_name: {
            type: 'string',
            example: 'admin',
          },
          temp_clone_token: {
            type: 'string',
          },
          delete_branch_on_merge: {
            type: 'boolean',
          },
          subscribers_count: {
            type: 'integer',
          },
          network_count: {
            type: 'integer',
          },
          code_of_conduct: {
            title: 'Code Of Conduct',
            description: 'Code Of Conduct',
            type: 'object',
            properties: {
              key: {
                type: 'string',
                example: 'contributor_covenant',
              },
              name: {
                type: 'string',
                example: 'Contributor Covenant',
              },
              url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://api.github.com/codes_of_conduct/contributor_covenant',
              },
              body: {
                type: 'string',
                example:
                  "# Contributor Covenant Code of Conduct\n\n## Our Pledge\n\nIn the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.\n\n## Our Standards\n\nExamples of behavior that contributes to creating a positive environment include:\n\n* Using welcoming and inclusive language\n* Being respectful of differing viewpoints and experiences\n* Gracefully accepting constructive criticism\n* Focusing on what is best for the community\n* Showing empathy towards other community members\n\nExamples of unacceptable behavior by participants include:\n\n* The use of sexualized language or imagery and unwelcome sexual attention or advances\n* Trolling, insulting/derogatory comments, and personal or political attacks\n* Public or private harassment\n* Publishing others' private information, such as a physical or electronic address, without explicit permission\n* Other conduct which could reasonably be considered inappropriate in a professional setting\n\n## Our Responsibilities\n\nProject maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response\n                  to any instances of unacceptable behavior.\n\nProject maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.\n\n## Scope\n\nThis Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address,\n                  posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.\n\n## Enforcement\n\nInstances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at [EMAIL]. The project team will review and investigate all complaints, and will respond in a way that it deems appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.\n\nProject maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.\n\n## Attribution\n\nThis Code of Conduct is adapted from the [Contributor Covenant](http://contributor-covenant.org), version 1.4, available at [http://contributor-covenant.org/version/1/4](http://contributor-covenant.org/version/1/4/).\n",
              },
              html_url: {
                type: ['string', 'null'],
                format: 'uri',
              },
            },
            required: ['url', 'html_url', 'key', 'name'],
          },
          license: {
            type: ['object', 'null'],
            properties: {
              key: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              spdx_id: {
                type: 'string',
              },
              url: {
                type: ['string', 'null'],
              },
              node_id: {
                type: 'string',
              },
            },
          },
          forks: {
            type: 'integer',
            example: 0,
          },
          open_issues: {
            type: 'integer',
            example: 0,
          },
          watchers: {
            type: 'integer',
            example: 0,
          },
          allow_forking: {
            type: 'boolean',
          },
          web_commit_signoff_required: {
            type: 'boolean',
            example: false,
          },
          security_and_analysis: {
            type: ['object', 'null'],
            properties: {
              advanced_security: {
                description:
                  'Enable or disable GitHub Advanced Security for the repository.\n\nFor standalone Code Scanning or Secret Protection products, this parameter cannot be used.\n',
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['enabled', 'disabled'],
                  },
                },
              },
              code_security: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['enabled', 'disabled'],
                  },
                },
              },
              dependabot_security_updates: {
                description:
                  'Enable or disable Dependabot security updates for the repository.',
                type: 'object',
                properties: {
                  status: {
                    description:
                      'The enablement status of Dependabot security updates for the repository.',
                    type: 'string',
                    enum: ['enabled', 'disabled'],
                  },
                },
              },
              secret_scanning: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['enabled', 'disabled'],
                  },
                },
              },
              secret_scanning_push_protection: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['enabled', 'disabled'],
                  },
                },
              },
              secret_scanning_non_provider_patterns: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['enabled', 'disabled'],
                  },
                },
              },
              secret_scanning_ai_detection: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['enabled', 'disabled'],
                  },
                },
              },
              secret_scanning_delegated_alert_dismissal: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['enabled', 'disabled'],
                  },
                },
              },
              secret_scanning_delegated_bypass: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['enabled', 'disabled'],
                  },
                },
              },
              secret_scanning_delegated_bypass_options: {
                type: 'object',
                properties: {
                  reviewers: {
                    type: 'array',
                    description:
                      'The bypass reviewers for secret scanning delegated bypass',
                    items: {
                      type: 'object',
                      required: ['reviewer_id', 'reviewer_type'],
                      properties: {
                        reviewer_id: {
                          type: 'integer',
                          description:
                            'The ID of the team or role selected as a bypass reviewer',
                        },
                        reviewer_type: {
                          type: 'string',
                          description: 'The type of the bypass reviewer',
                          enum: ['TEAM', 'ROLE'],
                        },
                        mode: {
                          type: 'string',
                          description: 'The bypass mode for the reviewer',
                          enum: ['ALWAYS', 'EXEMPT'],
                          default: 'ALWAYS',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          custom_properties: {
            type: 'object',
            description:
              'The custom properties that were defined for the repository. The keys are the custom property names, and the values are the corresponding custom property values.',
            additionalProperties: true,
          },
        },
        required: [
          'archive_url',
          'assignees_url',
          'blobs_url',
          'branches_url',
          'collaborators_url',
          'comments_url',
          'commits_url',
          'compare_url',
          'contents_url',
          'contributors_url',
          'deployments_url',
          'description',
          'downloads_url',
          'events_url',
          'fork',
          'forks_url',
          'full_name',
          'git_commits_url',
          'git_refs_url',
          'git_tags_url',
          'hooks_url',
          'html_url',
          'id',
          'node_id',
          'issue_comment_url',
          'issue_events_url',
          'issues_url',
          'keys_url',
          'labels_url',
          'languages_url',
          'merges_url',
          'milestones_url',
          'name',
          'notifications_url',
          'owner',
          'private',
          'pulls_url',
          'releases_url',
          'stargazers_url',
          'statuses_url',
          'subscribers_url',
          'subscription_url',
          'tags_url',
          'teams_url',
          'trees_url',
          'url',
        ],
        'x-github-breaking-changes': [
          {
            changeset: 'remove_has_downloads',
            patch: {
              properties: {
                has_downloads: null,
              },
            },
            version: '2026-03-10',
          },
        ],
      },
      invitee: {
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
      inviter: {
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
      permissions: {
        description: 'The permission associated with the invitation.',
        example: 'read',
        type: 'string',
        enum: ['read', 'write', 'admin', 'triage', 'maintain'],
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        example: '2016-06-13T14:52:50-05:00',
      },
      expired: {
        description: 'Whether or not the invitation has expired',
        type: 'boolean',
      },
      url: {
        description: 'URL for the repository invitation',
        example: 'https://api.github.com/user/repository-invitations/1',
        type: 'string',
      },
      html_url: {
        type: 'string',
        example: 'https://github.com/octocat/Hello-World/invitations',
      },
      node_id: {
        type: 'string',
      },
    },
    required: [
      'id',
      'node_id',
      'permissions',
      'inviter',
      'invitee',
      'repository',
      'url',
      'html_url',
      'created_at',
    ],
  },
};

function _validateResponse(
  value: unknown,
): ReposListInvitationsForAuthenticatedUserResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListInvitationsForAuthenticatedUser response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListInvitationsForAuthenticatedUserResponse;
}

export const REPOS_LIST_INVITATIONS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | ReposListInvitationsForAuthenticatedUserParams
      | (() => ReposListInvitationsForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<ReposListInvitationsForAuthenticatedUserResponse>
  >
>('REPOS_LIST_INVITATIONS_FOR_AUTHENTICATED_USER');

export function provideReposListInvitationsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: REPOS_LIST_INVITATIONS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | ReposListInvitationsForAuthenticatedUserParams
          | (() => ReposListInvitationsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<ReposListInvitationsForAuthenticatedUserResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/user/repository_invitations`,
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
