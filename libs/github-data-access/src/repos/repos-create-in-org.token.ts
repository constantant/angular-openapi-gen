import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateInOrgBody = NonNullable<
  paths['/orgs/{org}/repos']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateInOrgResponse =
  paths['/orgs/{org}/repos']['post']['responses']['201']['content']['application/json'];

export type ReposCreateInOrgError =
  | paths['/orgs/{org}/repos']['post']['responses']['403']['content']['application/json']
  | paths['/orgs/{org}/repos']['post']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Full Repository',
  description: 'Full Repository',
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
      example: 'http://api.github.com/repos/octocat/Hello-World/commits{/sha}',
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
      example: 'http://api.github.com/repos/octocat/Hello-World/contributors',
    },
    deployments_url: {
      type: 'string',
      format: 'uri',
      example: 'http://api.github.com/repos/octocat/Hello-World/deployments',
    },
    downloads_url: {
      type: 'string',
      format: 'uri',
      example: 'http://api.github.com/repos/octocat/Hello-World/downloads',
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
      example: 'http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}',
    },
    git_tags_url: {
      type: 'string',
      example: 'http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}',
    },
    git_url: {
      type: 'string',
      example: 'git:github.com/octocat/Hello-World.git',
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
      example: 'http://api.github.com/repos/octocat/Hello-World/keys{/key_id}',
    },
    labels_url: {
      type: 'string',
      example: 'http://api.github.com/repos/octocat/Hello-World/labels{/name}',
    },
    languages_url: {
      type: 'string',
      format: 'uri',
      example: 'http://api.github.com/repos/octocat/Hello-World/languages',
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
      example: 'http://api.github.com/repos/octocat/Hello-World/pulls{/number}',
    },
    releases_url: {
      type: 'string',
      example: 'http://api.github.com/repos/octocat/Hello-World/releases{/id}',
    },
    ssh_url: {
      type: 'string',
      example: 'git@github.com:octocat/Hello-World.git',
    },
    stargazers_url: {
      type: 'string',
      format: 'uri',
      example: 'http://api.github.com/repos/octocat/Hello-World/stargazers',
    },
    statuses_url: {
      type: 'string',
      example: 'http://api.github.com/repos/octocat/Hello-World/statuses/{sha}',
    },
    subscribers_url: {
      type: 'string',
      format: 'uri',
      example: 'http://api.github.com/repos/octocat/Hello-World/subscribers',
    },
    subscription_url: {
      type: 'string',
      format: 'uri',
      example: 'http://api.github.com/repos/octocat/Hello-World/subscription',
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
      example: 'https://github.com/octocat/Hello-World.git',
    },
    mirror_url: {
      type: ['string', 'null'],
      format: 'uri',
      example: 'git:git.example.com/octocat/Hello-World',
    },
    hooks_url: {
      type: 'string',
      format: 'uri',
      example: 'http://api.github.com/repos/octocat/Hello-World/hooks',
    },
    svn_url: {
      type: 'string',
      format: 'uri',
      example: 'https://svn.github.com/octocat/Hello-World',
    },
    homepage: {
      type: ['string', 'null'],
      format: 'uri',
      example: 'https://github.com',
    },
    language: {
      type: ['string', 'null'],
    },
    forks_count: {
      type: 'integer',
      example: 9,
    },
    stargazers_count: {
      type: 'integer',
      example: 80,
    },
    watchers_count: {
      type: 'integer',
      example: 80,
    },
    size: {
      description:
        'The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.',
      type: 'integer',
      example: 108,
    },
    default_branch: {
      type: 'string',
      example: 'master',
    },
    open_issues_count: {
      type: 'integer',
      example: 0,
    },
    is_template: {
      type: 'boolean',
      example: true,
    },
    topics: {
      type: 'array',
      items: {
        type: 'string',
      },
      example: ['octocat', 'atom', 'electron', 'API'],
    },
    has_issues: {
      type: 'boolean',
      example: true,
    },
    has_projects: {
      type: 'boolean',
      example: true,
    },
    has_wiki: {
      type: 'boolean',
      example: true,
    },
    has_pages: {
      type: 'boolean',
    },
    has_downloads: {
      type: 'boolean',
      example: true,
    },
    has_discussions: {
      type: 'boolean',
      example: true,
    },
    has_pull_requests: {
      type: 'boolean',
      example: true,
    },
    pull_request_creation_policy: {
      description:
        'The policy controlling who can create pull requests: all or collaborators_only.',
      type: 'string',
      enum: ['all', 'collaborators_only'],
      example: 'all',
    },
    archived: {
      type: 'boolean',
    },
    disabled: {
      type: 'boolean',
      description: 'Returns whether or not this repository disabled.',
    },
    visibility: {
      description: 'The repository visibility: public, private, or internal.',
      type: 'string',
      example: 'public',
    },
    pushed_at: {
      type: 'string',
      format: 'date-time',
      example: '2011-01-26T19:06:43Z',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      example: '2011-01-26T19:01:12Z',
    },
    updated_at: {
      type: 'string',
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
      required: ['admin', 'pull', 'push'],
    },
    allow_rebase_merge: {
      type: 'boolean',
      example: true,
    },
    template_repository: {
      title: 'Repository',
      description: 'A repository on GitHub.',
      type: ['object', 'null'],
      properties: {
        id: {
          description: 'Unique identifier of the repository',
          example: 42,
          type: 'integer',
          format: 'int64',
        },
        node_id: {
          type: 'string',
          example: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
        },
        name: {
          description: 'The name of the repository.',
          type: 'string',
          example: 'Team Environment',
        },
        full_name: {
          type: 'string',
          example: 'octocat/Hello-World',
        },
        license: {
          title: 'License Simple',
          description: 'License Simple',
          type: ['object', 'null'],
          properties: {
            key: {
              type: 'string',
              example: 'mit',
            },
            name: {
              type: 'string',
              example: 'MIT License',
            },
            url: {
              type: ['string', 'null'],
              format: 'uri',
              example: 'https://api.github.com/licenses/mit',
            },
            spdx_id: {
              type: ['string', 'null'],
              example: 'MIT',
            },
            node_id: {
              type: 'string',
              example: 'MDc6TGljZW5zZW1pdA==',
            },
            html_url: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['key', 'name', 'url', 'spdx_id', 'node_id'],
        },
        forks: {
          type: 'integer',
        },
        permissions: {
          type: 'object',
          properties: {
            admin: {
              type: 'boolean',
            },
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
          },
          required: ['admin', 'pull', 'push'],
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
        private: {
          description: 'Whether the repository is private or public.',
          default: false,
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
          example: 'http://api.github.com/repos/octocat/Hello-World/downloads',
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
          example: 'git:github.com/octocat/Hello-World.git',
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
          example: 'http://api.github.com/repos/octocat/Hello-World/languages',
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
          example: 'git@github.com:octocat/Hello-World.git',
        },
        stargazers_url: {
          type: 'string',
          format: 'uri',
          example: 'http://api.github.com/repos/octocat/Hello-World/stargazers',
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
          example: 'https://github.com/octocat/Hello-World.git',
        },
        mirror_url: {
          type: ['string', 'null'],
          format: 'uri',
          example: 'git:git.example.com/octocat/Hello-World',
        },
        hooks_url: {
          type: 'string',
          format: 'uri',
          example: 'http://api.github.com/repos/octocat/Hello-World/hooks',
        },
        svn_url: {
          type: 'string',
          format: 'uri',
          example: 'https://svn.github.com/octocat/Hello-World',
        },
        homepage: {
          type: ['string', 'null'],
          format: 'uri',
          example: 'https://github.com',
        },
        language: {
          type: ['string', 'null'],
        },
        forks_count: {
          type: 'integer',
          example: 9,
        },
        stargazers_count: {
          type: 'integer',
          example: 80,
        },
        watchers_count: {
          type: 'integer',
          example: 80,
        },
        size: {
          description:
            'The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.',
          type: 'integer',
          example: 108,
        },
        default_branch: {
          description: 'The default branch of the repository.',
          type: 'string',
          example: 'master',
        },
        open_issues_count: {
          type: 'integer',
          example: 0,
        },
        is_template: {
          description:
            'Whether this repository acts as a template that can be used to generate new repositories.',
          default: false,
          type: 'boolean',
          example: true,
        },
        topics: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        has_issues: {
          description: 'Whether issues are enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        has_projects: {
          description: 'Whether projects are enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        has_wiki: {
          description: 'Whether the wiki is enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        has_pages: {
          type: 'boolean',
        },
        has_downloads: {
          description: 'Whether downloads are enabled.',
          default: true,
          type: 'boolean',
          example: true,
          deprecated: true,
        },
        has_discussions: {
          description: 'Whether discussions are enabled.',
          default: false,
          type: 'boolean',
          example: true,
        },
        has_pull_requests: {
          description: 'Whether pull requests are enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        pull_request_creation_policy: {
          description:
            'The policy controlling who can create pull requests: all or collaborators_only.',
          type: 'string',
          enum: ['all', 'collaborators_only'],
          example: 'all',
        },
        archived: {
          description: 'Whether the repository is archived.',
          default: false,
          type: 'boolean',
        },
        disabled: {
          type: 'boolean',
          description: 'Returns whether or not this repository disabled.',
        },
        visibility: {
          description:
            'The repository visibility: public, private, or internal.',
          default: 'public',
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
        allow_rebase_merge: {
          description: 'Whether to allow rebase merges for pull requests.',
          default: true,
          type: 'boolean',
          example: true,
        },
        temp_clone_token: {
          type: 'string',
        },
        allow_squash_merge: {
          description: 'Whether to allow squash merges for pull requests.',
          default: true,
          type: 'boolean',
          example: true,
        },
        allow_auto_merge: {
          description:
            'Whether to allow Auto-merge to be used on pull requests.',
          default: false,
          type: 'boolean',
          example: false,
        },
        delete_branch_on_merge: {
          description:
            'Whether to delete head branches when pull requests are merged',
          default: false,
          type: 'boolean',
          example: false,
        },
        allow_update_branch: {
          description:
            'Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging.',
          default: false,
          type: 'boolean',
          example: false,
        },
        use_squash_pr_title_as_default: {
          type: 'boolean',
          description:
            'Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead.',
          default: false,
          deprecated: true,
        },
        squash_merge_commit_title: {
          type: 'string',
          enum: ['PR_TITLE', 'COMMIT_OR_PR_TITLE'],
          description:
            "The default value for a squash merge commit title:\n\n- `PR_TITLE` - default to the pull request's title.\n- `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).",
        },
        squash_merge_commit_message: {
          type: 'string',
          enum: ['PR_BODY', 'COMMIT_MESSAGES', 'BLANK'],
          description:
            "The default value for a squash merge commit message:\n\n- `PR_BODY` - default to the pull request's body.\n- `COMMIT_MESSAGES` - default to the branch's commit messages.\n- `BLANK` - default to a blank commit message.",
        },
        merge_commit_title: {
          type: 'string',
          enum: ['PR_TITLE', 'MERGE_MESSAGE'],
          description:
            "The default value for a merge commit title.\n\n- `PR_TITLE` - default to the pull request's title.\n- `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).",
        },
        merge_commit_message: {
          type: 'string',
          enum: ['PR_BODY', 'PR_TITLE', 'BLANK'],
          description:
            "The default value for a merge commit message.\n\n- `PR_TITLE` - default to the pull request's title.\n- `PR_BODY` - default to the pull request's body.\n- `BLANK` - default to a blank commit message.",
        },
        allow_merge_commit: {
          description: 'Whether to allow merge commits for pull requests.',
          default: true,
          type: 'boolean',
          example: true,
        },
        allow_forking: {
          description: 'Whether to allow forking this repo',
          type: 'boolean',
        },
        web_commit_signoff_required: {
          description:
            'Whether to require contributors to sign off on web-based commits',
          default: false,
          type: 'boolean',
        },
        open_issues: {
          type: 'integer',
        },
        watchers: {
          type: 'integer',
        },
        master_branch: {
          type: 'string',
        },
        starred_at: {
          type: 'string',
          example: '"2020-07-09T00:17:42Z"',
        },
        anonymous_access_enabled: {
          type: 'boolean',
          description:
            'Whether anonymous git access is enabled for this repository',
        },
        code_search_index_status: {
          type: 'object',
          description:
            'The status of the code search index for this repository',
          properties: {
            lexical_search_ok: {
              type: 'boolean',
            },
            lexical_commit_sha: {
              type: 'string',
            },
          },
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
        'clone_url',
        'default_branch',
        'forks',
        'forks_count',
        'git_url',
        'has_downloads',
        'has_issues',
        'has_projects',
        'has_wiki',
        'has_pages',
        'homepage',
        'language',
        'archived',
        'disabled',
        'mirror_url',
        'open_issues',
        'open_issues_count',
        'license',
        'pushed_at',
        'size',
        'ssh_url',
        'stargazers_count',
        'svn_url',
        'watchers',
        'watchers_count',
        'created_at',
        'updated_at',
      ],
      'x-github-breaking-changes': [
        {
          changeset: 'remove_use_squash_pr_title_as_default',
          patch: {
            properties: {
              use_squash_pr_title_as_default: null,
            },
          },
          version: '2026-03-10',
        },
        {
          changeset: 'deprecate_beta_media_type',
          patch: {
            properties: {
              master_branch: null,
            },
          },
          version: '2026-03-10',
        },
        {
          changeset: 'remove_has_downloads',
          patch: {
            properties: {
              has_downloads: null,
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
              'clone_url',
              'default_branch',
              'forks',
              'forks_count',
              'git_url',
              'has_issues',
              'has_projects',
              'has_wiki',
              'has_pages',
              'homepage',
              'language',
              'archived',
              'disabled',
              'mirror_url',
              'open_issues',
              'open_issues_count',
              'license',
              'pushed_at',
              'size',
              'ssh_url',
              'stargazers_count',
              'svn_url',
              'watchers',
              'watchers_count',
              'created_at',
              'updated_at',
            ],
          },
          version: '2026-03-10',
        },
      ],
    },
    temp_clone_token: {
      type: ['string', 'null'],
    },
    allow_squash_merge: {
      type: 'boolean',
      example: true,
    },
    allow_auto_merge: {
      type: 'boolean',
      example: false,
    },
    delete_branch_on_merge: {
      type: 'boolean',
      example: false,
    },
    allow_merge_commit: {
      type: 'boolean',
      example: true,
    },
    allow_update_branch: {
      type: 'boolean',
      example: true,
    },
    use_squash_pr_title_as_default: {
      type: 'boolean',
      example: false,
    },
    squash_merge_commit_title: {
      type: 'string',
      example: 'PR_TITLE',
      enum: ['PR_TITLE', 'COMMIT_OR_PR_TITLE'],
      description:
        "The default value for a squash merge commit title:\n\n- `PR_TITLE` - default to the pull request's title.\n- `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).",
    },
    squash_merge_commit_message: {
      type: 'string',
      example: 'PR_BODY',
      enum: ['PR_BODY', 'COMMIT_MESSAGES', 'BLANK'],
      description:
        "The default value for a squash merge commit message:\n\n- `PR_BODY` - default to the pull request's body.\n- `COMMIT_MESSAGES` - default to the branch's commit messages.\n- `BLANK` - default to a blank commit message.",
    },
    merge_commit_title: {
      type: 'string',
      example: 'PR_TITLE',
      enum: ['PR_TITLE', 'MERGE_MESSAGE'],
      description:
        "The default value for a merge commit title.\n\n  - `PR_TITLE` - default to the pull request's title.\n  - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).",
    },
    merge_commit_message: {
      type: 'string',
      example: 'PR_BODY',
      enum: ['PR_BODY', 'PR_TITLE', 'BLANK'],
      description:
        "The default value for a merge commit message.\n\n- `PR_TITLE` - default to the pull request's title.\n- `PR_BODY` - default to the pull request's body.\n- `BLANK` - default to a blank commit message.",
    },
    allow_forking: {
      type: 'boolean',
      example: true,
    },
    web_commit_signoff_required: {
      type: 'boolean',
      example: false,
    },
    subscribers_count: {
      type: 'integer',
      example: 42,
    },
    network_count: {
      type: 'integer',
      example: 0,
    },
    license: {
      title: 'License Simple',
      description: 'License Simple',
      type: ['object', 'null'],
      properties: {
        key: {
          type: 'string',
          example: 'mit',
        },
        name: {
          type: 'string',
          example: 'MIT License',
        },
        url: {
          type: ['string', 'null'],
          format: 'uri',
          example: 'https://api.github.com/licenses/mit',
        },
        spdx_id: {
          type: ['string', 'null'],
          example: 'MIT',
        },
        node_id: {
          type: 'string',
          example: 'MDc6TGljZW5zZW1pdA==',
        },
        html_url: {
          type: 'string',
          format: 'uri',
        },
      },
      required: ['key', 'name', 'url', 'spdx_id', 'node_id'],
    },
    organization: {
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
    parent: {
      title: 'Repository',
      description: 'A repository on GitHub.',
      type: 'object',
      properties: {
        id: {
          description: 'Unique identifier of the repository',
          example: 42,
          type: 'integer',
          format: 'int64',
        },
        node_id: {
          type: 'string',
          example: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
        },
        name: {
          description: 'The name of the repository.',
          type: 'string',
          example: 'Team Environment',
        },
        full_name: {
          type: 'string',
          example: 'octocat/Hello-World',
        },
        license: {
          title: 'License Simple',
          description: 'License Simple',
          type: ['object', 'null'],
          properties: {
            key: {
              type: 'string',
              example: 'mit',
            },
            name: {
              type: 'string',
              example: 'MIT License',
            },
            url: {
              type: ['string', 'null'],
              format: 'uri',
              example: 'https://api.github.com/licenses/mit',
            },
            spdx_id: {
              type: ['string', 'null'],
              example: 'MIT',
            },
            node_id: {
              type: 'string',
              example: 'MDc6TGljZW5zZW1pdA==',
            },
            html_url: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['key', 'name', 'url', 'spdx_id', 'node_id'],
        },
        forks: {
          type: 'integer',
        },
        permissions: {
          type: 'object',
          properties: {
            admin: {
              type: 'boolean',
            },
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
          },
          required: ['admin', 'pull', 'push'],
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
        private: {
          description: 'Whether the repository is private or public.',
          default: false,
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
          example: 'http://api.github.com/repos/octocat/Hello-World/downloads',
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
          example: 'git:github.com/octocat/Hello-World.git',
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
          example: 'http://api.github.com/repos/octocat/Hello-World/languages',
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
          example: 'git@github.com:octocat/Hello-World.git',
        },
        stargazers_url: {
          type: 'string',
          format: 'uri',
          example: 'http://api.github.com/repos/octocat/Hello-World/stargazers',
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
          example: 'https://github.com/octocat/Hello-World.git',
        },
        mirror_url: {
          type: ['string', 'null'],
          format: 'uri',
          example: 'git:git.example.com/octocat/Hello-World',
        },
        hooks_url: {
          type: 'string',
          format: 'uri',
          example: 'http://api.github.com/repos/octocat/Hello-World/hooks',
        },
        svn_url: {
          type: 'string',
          format: 'uri',
          example: 'https://svn.github.com/octocat/Hello-World',
        },
        homepage: {
          type: ['string', 'null'],
          format: 'uri',
          example: 'https://github.com',
        },
        language: {
          type: ['string', 'null'],
        },
        forks_count: {
          type: 'integer',
          example: 9,
        },
        stargazers_count: {
          type: 'integer',
          example: 80,
        },
        watchers_count: {
          type: 'integer',
          example: 80,
        },
        size: {
          description:
            'The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.',
          type: 'integer',
          example: 108,
        },
        default_branch: {
          description: 'The default branch of the repository.',
          type: 'string',
          example: 'master',
        },
        open_issues_count: {
          type: 'integer',
          example: 0,
        },
        is_template: {
          description:
            'Whether this repository acts as a template that can be used to generate new repositories.',
          default: false,
          type: 'boolean',
          example: true,
        },
        topics: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        has_issues: {
          description: 'Whether issues are enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        has_projects: {
          description: 'Whether projects are enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        has_wiki: {
          description: 'Whether the wiki is enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        has_pages: {
          type: 'boolean',
        },
        has_downloads: {
          description: 'Whether downloads are enabled.',
          default: true,
          type: 'boolean',
          example: true,
          deprecated: true,
        },
        has_discussions: {
          description: 'Whether discussions are enabled.',
          default: false,
          type: 'boolean',
          example: true,
        },
        has_pull_requests: {
          description: 'Whether pull requests are enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        pull_request_creation_policy: {
          description:
            'The policy controlling who can create pull requests: all or collaborators_only.',
          type: 'string',
          enum: ['all', 'collaborators_only'],
          example: 'all',
        },
        archived: {
          description: 'Whether the repository is archived.',
          default: false,
          type: 'boolean',
        },
        disabled: {
          type: 'boolean',
          description: 'Returns whether or not this repository disabled.',
        },
        visibility: {
          description:
            'The repository visibility: public, private, or internal.',
          default: 'public',
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
        allow_rebase_merge: {
          description: 'Whether to allow rebase merges for pull requests.',
          default: true,
          type: 'boolean',
          example: true,
        },
        temp_clone_token: {
          type: 'string',
        },
        allow_squash_merge: {
          description: 'Whether to allow squash merges for pull requests.',
          default: true,
          type: 'boolean',
          example: true,
        },
        allow_auto_merge: {
          description:
            'Whether to allow Auto-merge to be used on pull requests.',
          default: false,
          type: 'boolean',
          example: false,
        },
        delete_branch_on_merge: {
          description:
            'Whether to delete head branches when pull requests are merged',
          default: false,
          type: 'boolean',
          example: false,
        },
        allow_update_branch: {
          description:
            'Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging.',
          default: false,
          type: 'boolean',
          example: false,
        },
        use_squash_pr_title_as_default: {
          type: 'boolean',
          description:
            'Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead.',
          default: false,
          deprecated: true,
        },
        squash_merge_commit_title: {
          type: 'string',
          enum: ['PR_TITLE', 'COMMIT_OR_PR_TITLE'],
          description:
            "The default value for a squash merge commit title:\n\n- `PR_TITLE` - default to the pull request's title.\n- `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).",
        },
        squash_merge_commit_message: {
          type: 'string',
          enum: ['PR_BODY', 'COMMIT_MESSAGES', 'BLANK'],
          description:
            "The default value for a squash merge commit message:\n\n- `PR_BODY` - default to the pull request's body.\n- `COMMIT_MESSAGES` - default to the branch's commit messages.\n- `BLANK` - default to a blank commit message.",
        },
        merge_commit_title: {
          type: 'string',
          enum: ['PR_TITLE', 'MERGE_MESSAGE'],
          description:
            "The default value for a merge commit title.\n\n- `PR_TITLE` - default to the pull request's title.\n- `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).",
        },
        merge_commit_message: {
          type: 'string',
          enum: ['PR_BODY', 'PR_TITLE', 'BLANK'],
          description:
            "The default value for a merge commit message.\n\n- `PR_TITLE` - default to the pull request's title.\n- `PR_BODY` - default to the pull request's body.\n- `BLANK` - default to a blank commit message.",
        },
        allow_merge_commit: {
          description: 'Whether to allow merge commits for pull requests.',
          default: true,
          type: 'boolean',
          example: true,
        },
        allow_forking: {
          description: 'Whether to allow forking this repo',
          type: 'boolean',
        },
        web_commit_signoff_required: {
          description:
            'Whether to require contributors to sign off on web-based commits',
          default: false,
          type: 'boolean',
        },
        open_issues: {
          type: 'integer',
        },
        watchers: {
          type: 'integer',
        },
        master_branch: {
          type: 'string',
        },
        starred_at: {
          type: 'string',
          example: '"2020-07-09T00:17:42Z"',
        },
        anonymous_access_enabled: {
          type: 'boolean',
          description:
            'Whether anonymous git access is enabled for this repository',
        },
        code_search_index_status: {
          type: 'object',
          description:
            'The status of the code search index for this repository',
          properties: {
            lexical_search_ok: {
              type: 'boolean',
            },
            lexical_commit_sha: {
              type: 'string',
            },
          },
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
        'clone_url',
        'default_branch',
        'forks',
        'forks_count',
        'git_url',
        'has_downloads',
        'has_issues',
        'has_projects',
        'has_wiki',
        'has_pages',
        'homepage',
        'language',
        'archived',
        'disabled',
        'mirror_url',
        'open_issues',
        'open_issues_count',
        'license',
        'pushed_at',
        'size',
        'ssh_url',
        'stargazers_count',
        'svn_url',
        'watchers',
        'watchers_count',
        'created_at',
        'updated_at',
      ],
      'x-github-breaking-changes': [
        {
          changeset: 'remove_use_squash_pr_title_as_default',
          patch: {
            properties: {
              use_squash_pr_title_as_default: null,
            },
          },
          version: '2026-03-10',
        },
        {
          changeset: 'deprecate_beta_media_type',
          patch: {
            properties: {
              master_branch: null,
            },
          },
          version: '2026-03-10',
        },
        {
          changeset: 'remove_has_downloads',
          patch: {
            properties: {
              has_downloads: null,
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
              'clone_url',
              'default_branch',
              'forks',
              'forks_count',
              'git_url',
              'has_issues',
              'has_projects',
              'has_wiki',
              'has_pages',
              'homepage',
              'language',
              'archived',
              'disabled',
              'mirror_url',
              'open_issues',
              'open_issues_count',
              'license',
              'pushed_at',
              'size',
              'ssh_url',
              'stargazers_count',
              'svn_url',
              'watchers',
              'watchers_count',
              'created_at',
              'updated_at',
            ],
          },
          version: '2026-03-10',
        },
      ],
    },
    source: {
      title: 'Repository',
      description: 'A repository on GitHub.',
      type: 'object',
      properties: {
        id: {
          description: 'Unique identifier of the repository',
          example: 42,
          type: 'integer',
          format: 'int64',
        },
        node_id: {
          type: 'string',
          example: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
        },
        name: {
          description: 'The name of the repository.',
          type: 'string',
          example: 'Team Environment',
        },
        full_name: {
          type: 'string',
          example: 'octocat/Hello-World',
        },
        license: {
          title: 'License Simple',
          description: 'License Simple',
          type: ['object', 'null'],
          properties: {
            key: {
              type: 'string',
              example: 'mit',
            },
            name: {
              type: 'string',
              example: 'MIT License',
            },
            url: {
              type: ['string', 'null'],
              format: 'uri',
              example: 'https://api.github.com/licenses/mit',
            },
            spdx_id: {
              type: ['string', 'null'],
              example: 'MIT',
            },
            node_id: {
              type: 'string',
              example: 'MDc6TGljZW5zZW1pdA==',
            },
            html_url: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['key', 'name', 'url', 'spdx_id', 'node_id'],
        },
        forks: {
          type: 'integer',
        },
        permissions: {
          type: 'object',
          properties: {
            admin: {
              type: 'boolean',
            },
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
          },
          required: ['admin', 'pull', 'push'],
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
        private: {
          description: 'Whether the repository is private or public.',
          default: false,
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
          example: 'http://api.github.com/repos/octocat/Hello-World/downloads',
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
          example: 'git:github.com/octocat/Hello-World.git',
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
          example: 'http://api.github.com/repos/octocat/Hello-World/languages',
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
          example: 'git@github.com:octocat/Hello-World.git',
        },
        stargazers_url: {
          type: 'string',
          format: 'uri',
          example: 'http://api.github.com/repos/octocat/Hello-World/stargazers',
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
          example: 'https://github.com/octocat/Hello-World.git',
        },
        mirror_url: {
          type: ['string', 'null'],
          format: 'uri',
          example: 'git:git.example.com/octocat/Hello-World',
        },
        hooks_url: {
          type: 'string',
          format: 'uri',
          example: 'http://api.github.com/repos/octocat/Hello-World/hooks',
        },
        svn_url: {
          type: 'string',
          format: 'uri',
          example: 'https://svn.github.com/octocat/Hello-World',
        },
        homepage: {
          type: ['string', 'null'],
          format: 'uri',
          example: 'https://github.com',
        },
        language: {
          type: ['string', 'null'],
        },
        forks_count: {
          type: 'integer',
          example: 9,
        },
        stargazers_count: {
          type: 'integer',
          example: 80,
        },
        watchers_count: {
          type: 'integer',
          example: 80,
        },
        size: {
          description:
            'The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.',
          type: 'integer',
          example: 108,
        },
        default_branch: {
          description: 'The default branch of the repository.',
          type: 'string',
          example: 'master',
        },
        open_issues_count: {
          type: 'integer',
          example: 0,
        },
        is_template: {
          description:
            'Whether this repository acts as a template that can be used to generate new repositories.',
          default: false,
          type: 'boolean',
          example: true,
        },
        topics: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        has_issues: {
          description: 'Whether issues are enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        has_projects: {
          description: 'Whether projects are enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        has_wiki: {
          description: 'Whether the wiki is enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        has_pages: {
          type: 'boolean',
        },
        has_downloads: {
          description: 'Whether downloads are enabled.',
          default: true,
          type: 'boolean',
          example: true,
          deprecated: true,
        },
        has_discussions: {
          description: 'Whether discussions are enabled.',
          default: false,
          type: 'boolean',
          example: true,
        },
        has_pull_requests: {
          description: 'Whether pull requests are enabled.',
          default: true,
          type: 'boolean',
          example: true,
        },
        pull_request_creation_policy: {
          description:
            'The policy controlling who can create pull requests: all or collaborators_only.',
          type: 'string',
          enum: ['all', 'collaborators_only'],
          example: 'all',
        },
        archived: {
          description: 'Whether the repository is archived.',
          default: false,
          type: 'boolean',
        },
        disabled: {
          type: 'boolean',
          description: 'Returns whether or not this repository disabled.',
        },
        visibility: {
          description:
            'The repository visibility: public, private, or internal.',
          default: 'public',
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
        allow_rebase_merge: {
          description: 'Whether to allow rebase merges for pull requests.',
          default: true,
          type: 'boolean',
          example: true,
        },
        temp_clone_token: {
          type: 'string',
        },
        allow_squash_merge: {
          description: 'Whether to allow squash merges for pull requests.',
          default: true,
          type: 'boolean',
          example: true,
        },
        allow_auto_merge: {
          description:
            'Whether to allow Auto-merge to be used on pull requests.',
          default: false,
          type: 'boolean',
          example: false,
        },
        delete_branch_on_merge: {
          description:
            'Whether to delete head branches when pull requests are merged',
          default: false,
          type: 'boolean',
          example: false,
        },
        allow_update_branch: {
          description:
            'Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging.',
          default: false,
          type: 'boolean',
          example: false,
        },
        use_squash_pr_title_as_default: {
          type: 'boolean',
          description:
            'Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead.',
          default: false,
          deprecated: true,
        },
        squash_merge_commit_title: {
          type: 'string',
          enum: ['PR_TITLE', 'COMMIT_OR_PR_TITLE'],
          description:
            "The default value for a squash merge commit title:\n\n- `PR_TITLE` - default to the pull request's title.\n- `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).",
        },
        squash_merge_commit_message: {
          type: 'string',
          enum: ['PR_BODY', 'COMMIT_MESSAGES', 'BLANK'],
          description:
            "The default value for a squash merge commit message:\n\n- `PR_BODY` - default to the pull request's body.\n- `COMMIT_MESSAGES` - default to the branch's commit messages.\n- `BLANK` - default to a blank commit message.",
        },
        merge_commit_title: {
          type: 'string',
          enum: ['PR_TITLE', 'MERGE_MESSAGE'],
          description:
            "The default value for a merge commit title.\n\n- `PR_TITLE` - default to the pull request's title.\n- `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).",
        },
        merge_commit_message: {
          type: 'string',
          enum: ['PR_BODY', 'PR_TITLE', 'BLANK'],
          description:
            "The default value for a merge commit message.\n\n- `PR_TITLE` - default to the pull request's title.\n- `PR_BODY` - default to the pull request's body.\n- `BLANK` - default to a blank commit message.",
        },
        allow_merge_commit: {
          description: 'Whether to allow merge commits for pull requests.',
          default: true,
          type: 'boolean',
          example: true,
        },
        allow_forking: {
          description: 'Whether to allow forking this repo',
          type: 'boolean',
        },
        web_commit_signoff_required: {
          description:
            'Whether to require contributors to sign off on web-based commits',
          default: false,
          type: 'boolean',
        },
        open_issues: {
          type: 'integer',
        },
        watchers: {
          type: 'integer',
        },
        master_branch: {
          type: 'string',
        },
        starred_at: {
          type: 'string',
          example: '"2020-07-09T00:17:42Z"',
        },
        anonymous_access_enabled: {
          type: 'boolean',
          description:
            'Whether anonymous git access is enabled for this repository',
        },
        code_search_index_status: {
          type: 'object',
          description:
            'The status of the code search index for this repository',
          properties: {
            lexical_search_ok: {
              type: 'boolean',
            },
            lexical_commit_sha: {
              type: 'string',
            },
          },
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
        'clone_url',
        'default_branch',
        'forks',
        'forks_count',
        'git_url',
        'has_downloads',
        'has_issues',
        'has_projects',
        'has_wiki',
        'has_pages',
        'homepage',
        'language',
        'archived',
        'disabled',
        'mirror_url',
        'open_issues',
        'open_issues_count',
        'license',
        'pushed_at',
        'size',
        'ssh_url',
        'stargazers_count',
        'svn_url',
        'watchers',
        'watchers_count',
        'created_at',
        'updated_at',
      ],
      'x-github-breaking-changes': [
        {
          changeset: 'remove_use_squash_pr_title_as_default',
          patch: {
            properties: {
              use_squash_pr_title_as_default: null,
            },
          },
          version: '2026-03-10',
        },
        {
          changeset: 'deprecate_beta_media_type',
          patch: {
            properties: {
              master_branch: null,
            },
          },
          version: '2026-03-10',
        },
        {
          changeset: 'remove_has_downloads',
          patch: {
            properties: {
              has_downloads: null,
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
              'clone_url',
              'default_branch',
              'forks',
              'forks_count',
              'git_url',
              'has_issues',
              'has_projects',
              'has_wiki',
              'has_pages',
              'homepage',
              'language',
              'archived',
              'disabled',
              'mirror_url',
              'open_issues',
              'open_issues_count',
              'license',
              'pushed_at',
              'size',
              'ssh_url',
              'stargazers_count',
              'svn_url',
              'watchers',
              'watchers_count',
              'created_at',
              'updated_at',
            ],
          },
          version: '2026-03-10',
        },
      ],
    },
    forks: {
      type: 'integer',
    },
    master_branch: {
      type: 'string',
    },
    open_issues: {
      type: 'integer',
    },
    watchers: {
      type: 'integer',
    },
    anonymous_access_enabled: {
      description: 'Whether anonymous git access is allowed.',
      default: true,
      type: 'boolean',
    },
    code_of_conduct: {
      title: 'Code Of Conduct Simple',
      description: 'Code of Conduct Simple',
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'uri',
          example:
            'https://api.github.com/repos/github/docs/community/code_of_conduct',
        },
        key: {
          type: 'string',
          example: 'citizen_code_of_conduct',
        },
        name: {
          type: 'string',
          example: 'Citizen Code of Conduct',
        },
        html_url: {
          type: ['string', 'null'],
          format: 'uri',
          example:
            'https://github.com/github/docs/blob/main/CODE_OF_CONDUCT.md',
        },
      },
      required: ['url', 'key', 'name', 'html_url'],
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
    'clone_url',
    'default_branch',
    'forks',
    'forks_count',
    'git_url',
    'has_issues',
    'has_projects',
    'has_wiki',
    'has_pages',
    'has_discussions',
    'homepage',
    'language',
    'archived',
    'disabled',
    'mirror_url',
    'open_issues',
    'open_issues_count',
    'license',
    'pushed_at',
    'size',
    'ssh_url',
    'stargazers_count',
    'svn_url',
    'watchers',
    'watchers_count',
    'created_at',
    'updated_at',
    'network_count',
    'subscribers_count',
  ],
  'x-github-breaking-changes': [
    {
      changeset: 'remove_use_squash_pr_title_as_default',
      patch: {
        properties: {
          use_squash_pr_title_as_default: null,
        },
      },
      version: '2026-03-10',
    },
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
};

function _validateResponse(value: unknown): ReposCreateInOrgResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCreateInOrg response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCreateInOrgResponse;
}

export const REPOS_CREATE_IN_ORG = new InjectionToken<
  (
    org: string,
    body: ReposCreateInOrgBody | Signal<ReposCreateInOrgBody>,
  ) => ReturnType<typeof httpResource<ReposCreateInOrgResponse>>
>('REPOS_CREATE_IN_ORG');

export function provideReposCreateInOrg(): FactoryProvider {
  return {
    provide: REPOS_CREATE_IN_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body: ReposCreateInOrgBody | Signal<ReposCreateInOrgBody>,
      ) =>
        httpResource<ReposCreateInOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/repos`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
