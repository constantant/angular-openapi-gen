import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions']['get']['responses']['200']['content']['application/json'];

export type ReposGetAccessRestrictionsError =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
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
                example: 'https://api.github.com/organizations/1/team/1/repos',
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
                example: '"https://github.com/testorg-ea8ec76d71c3af4b"',
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
};

function _validateResponse(value: unknown): ReposGetAccessRestrictionsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetAccessRestrictions response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetAccessRestrictionsResponse;
}

export const REPOS_GET_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposGetAccessRestrictionsResponse>>
>('REPOS_GET_ACCESS_RESTRICTIONS');

export function provideReposGetAccessRestrictions(): FactoryProvider {
  return {
    provide: REPOS_GET_ACCESS_RESTRICTIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetAccessRestrictionsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
