import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateOrUpdateFileContentsBody = NonNullable<
  paths['/repos/{owner}/{repo}/contents/{path}']['put']['requestBody']
>['content']['application/json'];

export type ReposCreateOrUpdateFileContentsResponse =
  | paths['/repos/{owner}/{repo}/contents/{path}']['put']['responses']['200']['content']['application/json']
  | paths['/repos/{owner}/{repo}/contents/{path}']['put']['responses']['201']['content']['application/json'];

export type ReposCreateOrUpdateFileContentsError =
  | paths['/repos/{owner}/{repo}/contents/{path}']['put']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/contents/{path}']['put']['responses']['409']['content']['application/json']
  | paths['/repos/{owner}/{repo}/contents/{path}']['put']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'File Commit',
  description: 'File Commit',
  type: 'object',
  required: ['content', 'commit'],
  properties: {
    content: {
      type: ['object', 'null'],
      properties: {
        name: {
          type: 'string',
        },
        path: {
          type: 'string',
        },
        sha: {
          type: 'string',
        },
        size: {
          type: 'integer',
        },
        url: {
          type: 'string',
        },
        html_url: {
          type: 'string',
        },
        git_url: {
          type: 'string',
        },
        download_url: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        _links: {
          type: 'object',
          properties: {
            self: {
              type: 'string',
            },
            git: {
              type: 'string',
            },
            html: {
              type: 'string',
            },
          },
        },
      },
    },
    commit: {
      type: 'object',
      properties: {
        sha: {
          type: 'string',
        },
        node_id: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
        html_url: {
          type: 'string',
        },
        author: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
        committer: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
        message: {
          type: 'string',
        },
        tree: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            sha: {
              type: 'string',
            },
          },
        },
        parents: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
              },
              html_url: {
                type: 'string',
              },
              sha: {
                type: 'string',
              },
            },
          },
        },
        verification: {
          type: 'object',
          properties: {
            verified: {
              type: 'boolean',
            },
            reason: {
              type: 'string',
            },
            signature: {
              type: ['string', 'null'],
            },
            payload: {
              type: ['string', 'null'],
            },
            verified_at: {
              type: ['string', 'null'],
            },
          },
        },
      },
    },
  },
};

function _validateResponse(
  value: unknown,
): ReposCreateOrUpdateFileContentsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCreateOrUpdateFileContents response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCreateOrUpdateFileContentsResponse;
}

export const REPOS_CREATE_OR_UPDATE_FILE_CONTENTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    path: string,
    body:
      | ReposCreateOrUpdateFileContentsBody
      | Signal<ReposCreateOrUpdateFileContentsBody>,
  ) => ReturnType<typeof httpResource<ReposCreateOrUpdateFileContentsResponse>>
>('REPOS_CREATE_OR_UPDATE_FILE_CONTENTS');

export function provideReposCreateOrUpdateFileContents(): FactoryProvider {
  return {
    provide: REPOS_CREATE_OR_UPDATE_FILE_CONTENTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        path: string,
        body:
          | ReposCreateOrUpdateFileContentsBody
          | Signal<ReposCreateOrUpdateFileContentsBody>,
      ) =>
        httpResource<ReposCreateOrUpdateFileContentsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/contents/${path}`,
            method: 'PUT',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
