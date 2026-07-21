import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRemoveTeamAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['delete']['requestBody']
>['content']['application/json'];

export type ReposRemoveTeamAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['delete']['responses']['200']['content']['application/json'];

export type ReposRemoveTeamAccessRestrictionsError =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['delete']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
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
};

function _validateResponse(
  value: unknown,
): ReposRemoveTeamAccessRestrictionsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposRemoveTeamAccessRestrictions response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposRemoveTeamAccessRestrictionsResponse;
}

export const REPOS_REMOVE_TEAM_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposRemoveTeamAccessRestrictionsBody
      | Signal<ReposRemoveTeamAccessRestrictionsBody>,
  ) => ReturnType<
    typeof httpResource<ReposRemoveTeamAccessRestrictionsResponse>
  >
>('REPOS_REMOVE_TEAM_ACCESS_RESTRICTIONS');

export function provideReposRemoveTeamAccessRestrictions(): FactoryProvider {
  return {
    provide: REPOS_REMOVE_TEAM_ACCESS_RESTRICTIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposRemoveTeamAccessRestrictionsBody
          | Signal<ReposRemoveTeamAccessRestrictionsBody>,
      ) =>
        httpResource<ReposRemoveTeamAccessRestrictionsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
            method: 'DELETE',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
