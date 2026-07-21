import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCollaboratorPermissionLevelResponse =
  paths['/repos/{owner}/{repo}/collaborators/{username}/permission']['get']['responses']['200']['content']['application/json'];

export type ReposGetCollaboratorPermissionLevelError =
  paths['/repos/{owner}/{repo}/collaborators/{username}/permission']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Repository Collaborator Permission',
  description: 'Repository Collaborator Permission',
  type: 'object',
  properties: {
    permission: {
      type: 'string',
    },
    role_name: {
      type: 'string',
      example: 'admin',
    },
    user: {
      title: 'Collaborator',
      description: 'Collaborator',
      type: ['object', 'null'],
      properties: {
        login: {
          type: 'string',
          example: 'octocat',
        },
        id: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
        email: {
          type: ['string', 'null'],
        },
        name: {
          type: ['string', 'null'],
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
          required: ['pull', 'push', 'admin'],
        },
        role_name: {
          type: 'string',
          example: 'admin',
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
        'role_name',
      ],
    },
  },
  required: ['permission', 'role_name', 'user'],
};

function _validateResponse(
  value: unknown,
): ReposGetCollaboratorPermissionLevelResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetCollaboratorPermissionLevel response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetCollaboratorPermissionLevelResponse;
}

export const REPOS_GET_COLLABORATOR_PERMISSION_LEVEL = new InjectionToken<
  (
    owner: string,
    repo: string,
    username: string,
  ) => ReturnType<
    typeof httpResource<ReposGetCollaboratorPermissionLevelResponse>
  >
>('REPOS_GET_COLLABORATOR_PERMISSION_LEVEL');

export function provideReposGetCollaboratorPermissionLevel(): FactoryProvider {
  return {
    provide: REPOS_GET_COLLABORATOR_PERMISSION_LEVEL,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, username: string) =>
        httpResource<ReposGetCollaboratorPermissionLevelResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/collaborators/${username}/permission`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
