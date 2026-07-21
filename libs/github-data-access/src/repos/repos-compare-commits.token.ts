import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCompareCommitsParams =
  paths['/repos/{owner}/{repo}/compare/{basehead}']['get']['parameters']['query'];

export type ReposCompareCommitsResponse =
  paths['/repos/{owner}/{repo}/compare/{basehead}']['get']['responses']['200']['content']['application/json'];

export type ReposCompareCommitsError =
  | paths['/repos/{owner}/{repo}/compare/{basehead}']['get']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/compare/{basehead}']['get']['responses']['500']['content']['application/json']
  | paths['/repos/{owner}/{repo}/compare/{basehead}']['get']['responses']['503']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Commit Comparison',
  description: 'Commit Comparison',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
      example:
        'https://api.github.com/repos/octocat/Hello-World/compare/master...topic',
    },
    html_url: {
      type: 'string',
      format: 'uri',
      example: 'https://github.com/octocat/Hello-World/compare/master...topic',
    },
    permalink_url: {
      type: 'string',
      format: 'uri',
      example:
        'https://github.com/octocat/Hello-World/compare/octocat:bbcd538c8e72b8c175046e27cc8f907076331401...octocat:0328041d1152db8ae77652d1618a02e57f745f17',
    },
    diff_url: {
      type: 'string',
      format: 'uri',
      example:
        'https://github.com/octocat/Hello-World/compare/master...topic.diff',
    },
    patch_url: {
      type: 'string',
      format: 'uri',
      example:
        'https://github.com/octocat/Hello-World/compare/master...topic.patch',
    },
    base_commit: {
      title: 'Commit',
      description: 'Commit',
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'uri',
          example:
            'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        },
        sha: {
          type: 'string',
          example: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
        },
        node_id: {
          type: 'string',
          example:
            'MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==',
        },
        html_url: {
          type: 'string',
          format: 'uri',
          example:
            'https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        },
        comments_url: {
          type: 'string',
          format: 'uri',
          example:
            'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments',
        },
        commit: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              format: 'uri',
              example:
                'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
            },
            author: {
              title: 'Git User',
              description:
                'Metaproperties for Git author/committer information.',
              type: ['object', 'null'],
              properties: {
                name: {
                  type: 'string',
                  example: '"Chris Wanstrath"',
                },
                email: {
                  type: 'string',
                  example: '"chris@ozmm.org"',
                },
                date: {
                  type: 'string',
                  format: 'date-time',
                  example: '"2007-10-29T02:42:39.000-07:00"',
                },
              },
            },
            committer: {
              title: 'Git User',
              description:
                'Metaproperties for Git author/committer information.',
              type: ['object', 'null'],
              properties: {
                name: {
                  type: 'string',
                  example: '"Chris Wanstrath"',
                },
                email: {
                  type: 'string',
                  example: '"chris@ozmm.org"',
                },
                date: {
                  type: 'string',
                  format: 'date-time',
                  example: '"2007-10-29T02:42:39.000-07:00"',
                },
              },
            },
            message: {
              type: 'string',
              example: 'Fix all the bugs',
            },
            comment_count: {
              type: 'integer',
              example: 0,
            },
            tree: {
              type: 'object',
              properties: {
                sha: {
                  type: 'string',
                  example: '827efc6d56897b048c772eb4087f854f46256132',
                },
                url: {
                  type: 'string',
                  format: 'uri',
                  example:
                    'https://api.github.com/repos/octocat/Hello-World/tree/827efc6d56897b048c772eb4087f854f46256132',
                },
              },
              required: ['sha', 'url'],
            },
            verification: {
              title: 'Verification',
              type: 'object',
              properties: {
                verified: {
                  type: 'boolean',
                },
                reason: {
                  type: 'string',
                },
                payload: {
                  type: ['string', 'null'],
                },
                signature: {
                  type: ['string', 'null'],
                },
                verified_at: {
                  type: ['string', 'null'],
                },
              },
              required: [
                'verified',
                'reason',
                'payload',
                'signature',
                'verified_at',
              ],
            },
          },
          required: [
            'author',
            'committer',
            'comment_count',
            'message',
            'tree',
            'url',
          ],
        },
        author: {
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
              title: 'Empty Object',
              description: 'An object without any properties.',
              type: 'object',
              properties: {},
              additionalProperties: false,
            },
          ],
        },
        committer: {
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
              title: 'Empty Object',
              description: 'An object without any properties.',
              type: 'object',
              properties: {},
              additionalProperties: false,
            },
          ],
        },
        parents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              sha: {
                type: 'string',
                example: '7638417db6d59f3c431d3e1f261cc637155684cd',
              },
              url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://api.github.com/repos/octocat/Hello-World/commits/7638417db6d59f3c431d3e1f261cc637155684cd',
              },
              html_url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://github.com/octocat/Hello-World/commit/7638417db6d59f3c431d3e1f261cc637155684cd',
              },
            },
            required: ['sha', 'url'],
          },
        },
        stats: {
          type: 'object',
          properties: {
            additions: {
              type: 'integer',
            },
            deletions: {
              type: 'integer',
            },
            total: {
              type: 'integer',
            },
          },
        },
        files: {
          type: 'array',
          items: {
            title: 'Diff Entry',
            description: 'Diff Entry',
            type: 'object',
            properties: {
              sha: {
                type: ['string', 'null'],
                example: 'bbcd538c8e72b8c175046e27cc8f907076331401',
              },
              filename: {
                type: 'string',
                example: 'file1.txt',
              },
              status: {
                type: 'string',
                enum: [
                  'added',
                  'removed',
                  'modified',
                  'renamed',
                  'copied',
                  'changed',
                  'unchanged',
                ],
                example: 'added',
              },
              additions: {
                type: 'integer',
                example: 103,
              },
              deletions: {
                type: 'integer',
                example: 21,
              },
              changes: {
                type: 'integer',
                example: 124,
              },
              blob_url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://github.com/octocat/Hello-World/blob/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt',
              },
              raw_url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://github.com/octocat/Hello-World/raw/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt',
              },
              contents_url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://api.github.com/repos/octocat/Hello-World/contents/file1.txt?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e',
              },
              patch: {
                type: 'string',
                example:
                  '@@ -132,7 +132,7 @@ module Test @@ -1000,7 +1000,7 @@ module Test',
              },
              previous_filename: {
                type: 'string',
                example: 'file.txt',
              },
            },
            required: [
              'additions',
              'blob_url',
              'changes',
              'contents_url',
              'deletions',
              'filename',
              'raw_url',
              'sha',
              'status',
            ],
          },
        },
      },
      required: [
        'url',
        'sha',
        'node_id',
        'html_url',
        'comments_url',
        'commit',
        'author',
        'committer',
        'parents',
      ],
    },
    merge_base_commit: {
      title: 'Commit',
      description: 'Commit',
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'uri',
          example:
            'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        },
        sha: {
          type: 'string',
          example: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
        },
        node_id: {
          type: 'string',
          example:
            'MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==',
        },
        html_url: {
          type: 'string',
          format: 'uri',
          example:
            'https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e',
        },
        comments_url: {
          type: 'string',
          format: 'uri',
          example:
            'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments',
        },
        commit: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              format: 'uri',
              example:
                'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
            },
            author: {
              title: 'Git User',
              description:
                'Metaproperties for Git author/committer information.',
              type: ['object', 'null'],
              properties: {
                name: {
                  type: 'string',
                  example: '"Chris Wanstrath"',
                },
                email: {
                  type: 'string',
                  example: '"chris@ozmm.org"',
                },
                date: {
                  type: 'string',
                  format: 'date-time',
                  example: '"2007-10-29T02:42:39.000-07:00"',
                },
              },
            },
            committer: {
              title: 'Git User',
              description:
                'Metaproperties for Git author/committer information.',
              type: ['object', 'null'],
              properties: {
                name: {
                  type: 'string',
                  example: '"Chris Wanstrath"',
                },
                email: {
                  type: 'string',
                  example: '"chris@ozmm.org"',
                },
                date: {
                  type: 'string',
                  format: 'date-time',
                  example: '"2007-10-29T02:42:39.000-07:00"',
                },
              },
            },
            message: {
              type: 'string',
              example: 'Fix all the bugs',
            },
            comment_count: {
              type: 'integer',
              example: 0,
            },
            tree: {
              type: 'object',
              properties: {
                sha: {
                  type: 'string',
                  example: '827efc6d56897b048c772eb4087f854f46256132',
                },
                url: {
                  type: 'string',
                  format: 'uri',
                  example:
                    'https://api.github.com/repos/octocat/Hello-World/tree/827efc6d56897b048c772eb4087f854f46256132',
                },
              },
              required: ['sha', 'url'],
            },
            verification: {
              title: 'Verification',
              type: 'object',
              properties: {
                verified: {
                  type: 'boolean',
                },
                reason: {
                  type: 'string',
                },
                payload: {
                  type: ['string', 'null'],
                },
                signature: {
                  type: ['string', 'null'],
                },
                verified_at: {
                  type: ['string', 'null'],
                },
              },
              required: [
                'verified',
                'reason',
                'payload',
                'signature',
                'verified_at',
              ],
            },
          },
          required: [
            'author',
            'committer',
            'comment_count',
            'message',
            'tree',
            'url',
          ],
        },
        author: {
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
              title: 'Empty Object',
              description: 'An object without any properties.',
              type: 'object',
              properties: {},
              additionalProperties: false,
            },
          ],
        },
        committer: {
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
              title: 'Empty Object',
              description: 'An object without any properties.',
              type: 'object',
              properties: {},
              additionalProperties: false,
            },
          ],
        },
        parents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              sha: {
                type: 'string',
                example: '7638417db6d59f3c431d3e1f261cc637155684cd',
              },
              url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://api.github.com/repos/octocat/Hello-World/commits/7638417db6d59f3c431d3e1f261cc637155684cd',
              },
              html_url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://github.com/octocat/Hello-World/commit/7638417db6d59f3c431d3e1f261cc637155684cd',
              },
            },
            required: ['sha', 'url'],
          },
        },
        stats: {
          type: 'object',
          properties: {
            additions: {
              type: 'integer',
            },
            deletions: {
              type: 'integer',
            },
            total: {
              type: 'integer',
            },
          },
        },
        files: {
          type: 'array',
          items: {
            title: 'Diff Entry',
            description: 'Diff Entry',
            type: 'object',
            properties: {
              sha: {
                type: ['string', 'null'],
                example: 'bbcd538c8e72b8c175046e27cc8f907076331401',
              },
              filename: {
                type: 'string',
                example: 'file1.txt',
              },
              status: {
                type: 'string',
                enum: [
                  'added',
                  'removed',
                  'modified',
                  'renamed',
                  'copied',
                  'changed',
                  'unchanged',
                ],
                example: 'added',
              },
              additions: {
                type: 'integer',
                example: 103,
              },
              deletions: {
                type: 'integer',
                example: 21,
              },
              changes: {
                type: 'integer',
                example: 124,
              },
              blob_url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://github.com/octocat/Hello-World/blob/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt',
              },
              raw_url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://github.com/octocat/Hello-World/raw/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt',
              },
              contents_url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://api.github.com/repos/octocat/Hello-World/contents/file1.txt?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e',
              },
              patch: {
                type: 'string',
                example:
                  '@@ -132,7 +132,7 @@ module Test @@ -1000,7 +1000,7 @@ module Test',
              },
              previous_filename: {
                type: 'string',
                example: 'file.txt',
              },
            },
            required: [
              'additions',
              'blob_url',
              'changes',
              'contents_url',
              'deletions',
              'filename',
              'raw_url',
              'sha',
              'status',
            ],
          },
        },
      },
      required: [
        'url',
        'sha',
        'node_id',
        'html_url',
        'comments_url',
        'commit',
        'author',
        'committer',
        'parents',
      ],
    },
    status: {
      type: 'string',
      enum: ['diverged', 'ahead', 'behind', 'identical'],
      example: 'ahead',
    },
    ahead_by: {
      type: 'integer',
      example: 4,
    },
    behind_by: {
      type: 'integer',
      example: 5,
    },
    total_commits: {
      type: 'integer',
      example: 6,
    },
    commits: {
      type: 'array',
      items: {
        title: 'Commit',
        description: 'Commit',
        type: 'object',
        properties: {
          url: {
            type: 'string',
            format: 'uri',
            example:
              'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
          },
          sha: {
            type: 'string',
            example: '6dcb09b5b57875f334f61aebed695e2e4193db5e',
          },
          node_id: {
            type: 'string',
            example:
              'MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==',
          },
          html_url: {
            type: 'string',
            format: 'uri',
            example:
              'https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e',
          },
          comments_url: {
            type: 'string',
            format: 'uri',
            example:
              'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments',
          },
          commit: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                format: 'uri',
                example:
                  'https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e',
              },
              author: {
                title: 'Git User',
                description:
                  'Metaproperties for Git author/committer information.',
                type: ['object', 'null'],
                properties: {
                  name: {
                    type: 'string',
                    example: '"Chris Wanstrath"',
                  },
                  email: {
                    type: 'string',
                    example: '"chris@ozmm.org"',
                  },
                  date: {
                    type: 'string',
                    format: 'date-time',
                    example: '"2007-10-29T02:42:39.000-07:00"',
                  },
                },
              },
              committer: {
                title: 'Git User',
                description:
                  'Metaproperties for Git author/committer information.',
                type: ['object', 'null'],
                properties: {
                  name: {
                    type: 'string',
                    example: '"Chris Wanstrath"',
                  },
                  email: {
                    type: 'string',
                    example: '"chris@ozmm.org"',
                  },
                  date: {
                    type: 'string',
                    format: 'date-time',
                    example: '"2007-10-29T02:42:39.000-07:00"',
                  },
                },
              },
              message: {
                type: 'string',
                example: 'Fix all the bugs',
              },
              comment_count: {
                type: 'integer',
                example: 0,
              },
              tree: {
                type: 'object',
                properties: {
                  sha: {
                    type: 'string',
                    example: '827efc6d56897b048c772eb4087f854f46256132',
                  },
                  url: {
                    type: 'string',
                    format: 'uri',
                    example:
                      'https://api.github.com/repos/octocat/Hello-World/tree/827efc6d56897b048c772eb4087f854f46256132',
                  },
                },
                required: ['sha', 'url'],
              },
              verification: {
                title: 'Verification',
                type: 'object',
                properties: {
                  verified: {
                    type: 'boolean',
                  },
                  reason: {
                    type: 'string',
                  },
                  payload: {
                    type: ['string', 'null'],
                  },
                  signature: {
                    type: ['string', 'null'],
                  },
                  verified_at: {
                    type: ['string', 'null'],
                  },
                },
                required: [
                  'verified',
                  'reason',
                  'payload',
                  'signature',
                  'verified_at',
                ],
              },
            },
            required: [
              'author',
              'committer',
              'comment_count',
              'message',
              'tree',
              'url',
            ],
          },
          author: {
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
                    example: 'https://api.github.com/users/octocat/followers',
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
                title: 'Empty Object',
                description: 'An object without any properties.',
                type: 'object',
                properties: {},
                additionalProperties: false,
              },
            ],
          },
          committer: {
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
                    example: 'https://api.github.com/users/octocat/followers',
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
                title: 'Empty Object',
                description: 'An object without any properties.',
                type: 'object',
                properties: {},
                additionalProperties: false,
              },
            ],
          },
          parents: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                sha: {
                  type: 'string',
                  example: '7638417db6d59f3c431d3e1f261cc637155684cd',
                },
                url: {
                  type: 'string',
                  format: 'uri',
                  example:
                    'https://api.github.com/repos/octocat/Hello-World/commits/7638417db6d59f3c431d3e1f261cc637155684cd',
                },
                html_url: {
                  type: 'string',
                  format: 'uri',
                  example:
                    'https://github.com/octocat/Hello-World/commit/7638417db6d59f3c431d3e1f261cc637155684cd',
                },
              },
              required: ['sha', 'url'],
            },
          },
          stats: {
            type: 'object',
            properties: {
              additions: {
                type: 'integer',
              },
              deletions: {
                type: 'integer',
              },
              total: {
                type: 'integer',
              },
            },
          },
          files: {
            type: 'array',
            items: {
              title: 'Diff Entry',
              description: 'Diff Entry',
              type: 'object',
              properties: {
                sha: {
                  type: ['string', 'null'],
                  example: 'bbcd538c8e72b8c175046e27cc8f907076331401',
                },
                filename: {
                  type: 'string',
                  example: 'file1.txt',
                },
                status: {
                  type: 'string',
                  enum: [
                    'added',
                    'removed',
                    'modified',
                    'renamed',
                    'copied',
                    'changed',
                    'unchanged',
                  ],
                  example: 'added',
                },
                additions: {
                  type: 'integer',
                  example: 103,
                },
                deletions: {
                  type: 'integer',
                  example: 21,
                },
                changes: {
                  type: 'integer',
                  example: 124,
                },
                blob_url: {
                  type: 'string',
                  format: 'uri',
                  example:
                    'https://github.com/octocat/Hello-World/blob/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt',
                },
                raw_url: {
                  type: 'string',
                  format: 'uri',
                  example:
                    'https://github.com/octocat/Hello-World/raw/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt',
                },
                contents_url: {
                  type: 'string',
                  format: 'uri',
                  example:
                    'https://api.github.com/repos/octocat/Hello-World/contents/file1.txt?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e',
                },
                patch: {
                  type: 'string',
                  example:
                    '@@ -132,7 +132,7 @@ module Test @@ -1000,7 +1000,7 @@ module Test',
                },
                previous_filename: {
                  type: 'string',
                  example: 'file.txt',
                },
              },
              required: [
                'additions',
                'blob_url',
                'changes',
                'contents_url',
                'deletions',
                'filename',
                'raw_url',
                'sha',
                'status',
              ],
            },
          },
        },
        required: [
          'url',
          'sha',
          'node_id',
          'html_url',
          'comments_url',
          'commit',
          'author',
          'committer',
          'parents',
        ],
      },
    },
    files: {
      type: 'array',
      items: {
        title: 'Diff Entry',
        description: 'Diff Entry',
        type: 'object',
        properties: {
          sha: {
            type: ['string', 'null'],
            example: 'bbcd538c8e72b8c175046e27cc8f907076331401',
          },
          filename: {
            type: 'string',
            example: 'file1.txt',
          },
          status: {
            type: 'string',
            enum: [
              'added',
              'removed',
              'modified',
              'renamed',
              'copied',
              'changed',
              'unchanged',
            ],
            example: 'added',
          },
          additions: {
            type: 'integer',
            example: 103,
          },
          deletions: {
            type: 'integer',
            example: 21,
          },
          changes: {
            type: 'integer',
            example: 124,
          },
          blob_url: {
            type: 'string',
            format: 'uri',
            example:
              'https://github.com/octocat/Hello-World/blob/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt',
          },
          raw_url: {
            type: 'string',
            format: 'uri',
            example:
              'https://github.com/octocat/Hello-World/raw/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt',
          },
          contents_url: {
            type: 'string',
            format: 'uri',
            example:
              'https://api.github.com/repos/octocat/Hello-World/contents/file1.txt?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e',
          },
          patch: {
            type: 'string',
            example:
              '@@ -132,7 +132,7 @@ module Test @@ -1000,7 +1000,7 @@ module Test',
          },
          previous_filename: {
            type: 'string',
            example: 'file.txt',
          },
        },
        required: [
          'additions',
          'blob_url',
          'changes',
          'contents_url',
          'deletions',
          'filename',
          'raw_url',
          'sha',
          'status',
        ],
      },
    },
  },
  required: [
    'url',
    'html_url',
    'permalink_url',
    'diff_url',
    'patch_url',
    'base_commit',
    'merge_base_commit',
    'status',
    'ahead_by',
    'behind_by',
    'total_commits',
    'commits',
  ],
};

function _validateResponse(value: unknown): ReposCompareCommitsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCompareCommits response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCompareCommitsResponse;
}

export const REPOS_COMPARE_COMMITS = new InjectionToken<
  (
    owner: string,
    repo: string,
    basehead: string,
    params?:
      ReposCompareCommitsParams | (() => ReposCompareCommitsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposCompareCommitsResponse>>
>('REPOS_COMPARE_COMMITS');

export function provideReposCompareCommits(): FactoryProvider {
  return {
    provide: REPOS_COMPARE_COMMITS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        basehead: string,
        params?:
          | ReposCompareCommitsParams
          | (() => ReposCompareCommitsParams | undefined),
      ) =>
        httpResource<ReposCompareCommitsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/compare/${basehead}`,
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
