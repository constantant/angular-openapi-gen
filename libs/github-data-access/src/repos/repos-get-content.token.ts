import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths, components } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetContentParams =
  paths['/repos/{owner}/{repo}/contents/{path}']['get']['parameters']['query'];

export type ReposGetContentResponse =
  paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['200']['content']['application/json'];

export type ReposGetContentError =
  | paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['403']['content']['application/json']
  | paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['404']['content']['application/json'];

export type ReposGetContentDiscriminatorKey =
  'array' | 'file' | 'symlink' | 'submodule';

export type ReposGetContentArray =
  components['schemas']['content-directory'] & { type: 'array' };

export type ReposGetContentFile = components['schemas']['content-file'] & {
  type: 'file';
};

export type ReposGetContentSymlink =
  components['schemas']['content-symlink'] & { type: 'symlink' };

export type ReposGetContentSubmodule =
  components['schemas']['content-submodule'] & { type: 'submodule' };

export type ReposGetContentDiscriminated =
  | ReposGetContentArray
  | ReposGetContentFile
  | ReposGetContentSymlink
  | ReposGetContentSubmodule;

const _responseSchema: Schema = {
  oneOf: [
    {
      title: 'Content Directory',
      description: 'A list of directory items',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['dir', 'file', 'submodule', 'symlink'],
          },
          size: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
          path: {
            type: 'string',
          },
          content: {
            type: 'string',
          },
          sha: {
            type: 'string',
          },
          url: {
            type: 'string',
            format: 'uri',
          },
          git_url: {
            type: ['string', 'null'],
            format: 'uri',
          },
          html_url: {
            type: ['string', 'null'],
            format: 'uri',
          },
          download_url: {
            type: ['string', 'null'],
            format: 'uri',
          },
          _links: {
            type: 'object',
            properties: {
              git: {
                type: ['string', 'null'],
                format: 'uri',
              },
              html: {
                type: ['string', 'null'],
                format: 'uri',
              },
              self: {
                type: 'string',
                format: 'uri',
              },
            },
            required: ['git', 'html', 'self'],
          },
        },
        required: [
          '_links',
          'git_url',
          'html_url',
          'download_url',
          'name',
          'path',
          'sha',
          'size',
          'type',
          'url',
        ],
      },
    },
    {
      title: 'Content File',
      description: 'Content File',
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['file'],
        },
        encoding: {
          type: 'string',
        },
        size: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        path: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
        sha: {
          type: 'string',
        },
        url: {
          type: 'string',
          format: 'uri',
        },
        git_url: {
          type: ['string', 'null'],
          format: 'uri',
        },
        html_url: {
          type: ['string', 'null'],
          format: 'uri',
        },
        download_url: {
          type: ['string', 'null'],
          format: 'uri',
        },
        _links: {
          type: 'object',
          properties: {
            git: {
              type: ['string', 'null'],
              format: 'uri',
            },
            html: {
              type: ['string', 'null'],
              format: 'uri',
            },
            self: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['git', 'html', 'self'],
        },
        target: {
          type: 'string',
          example: '"actual/actual.md"',
        },
        submodule_git_url: {
          type: 'string',
          example: '"git://example.com/defunkt/dotjs.git"',
        },
      },
      required: [
        '_links',
        'git_url',
        'html_url',
        'download_url',
        'name',
        'path',
        'sha',
        'size',
        'type',
        'url',
        'content',
        'encoding',
      ],
    },
    {
      title: 'Symlink Content',
      description: 'An object describing a symlink',
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['symlink'],
        },
        target: {
          type: 'string',
        },
        size: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        path: {
          type: 'string',
        },
        sha: {
          type: 'string',
        },
        url: {
          type: 'string',
          format: 'uri',
        },
        git_url: {
          type: ['string', 'null'],
          format: 'uri',
        },
        html_url: {
          type: ['string', 'null'],
          format: 'uri',
        },
        download_url: {
          type: ['string', 'null'],
          format: 'uri',
        },
        _links: {
          type: 'object',
          properties: {
            git: {
              type: ['string', 'null'],
              format: 'uri',
            },
            html: {
              type: ['string', 'null'],
              format: 'uri',
            },
            self: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['git', 'html', 'self'],
        },
      },
      required: [
        '_links',
        'git_url',
        'html_url',
        'download_url',
        'name',
        'path',
        'sha',
        'size',
        'type',
        'url',
        'target',
      ],
    },
    {
      title: 'Submodule Content',
      description: 'An object describing a submodule',
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['submodule'],
        },
        submodule_git_url: {
          type: 'string',
          format: 'uri',
        },
        size: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        path: {
          type: 'string',
        },
        sha: {
          type: 'string',
        },
        url: {
          type: 'string',
          format: 'uri',
        },
        git_url: {
          type: ['string', 'null'],
          format: 'uri',
        },
        html_url: {
          type: ['string', 'null'],
          format: 'uri',
        },
        download_url: {
          type: ['string', 'null'],
          format: 'uri',
        },
        _links: {
          type: 'object',
          properties: {
            git: {
              type: ['string', 'null'],
              format: 'uri',
            },
            html: {
              type: ['string', 'null'],
              format: 'uri',
            },
            self: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['git', 'html', 'self'],
        },
      },
      required: [
        '_links',
        'git_url',
        'html_url',
        'download_url',
        'name',
        'path',
        'sha',
        'size',
        'type',
        'url',
        'submodule_git_url',
      ],
    },
  ],
  discriminator: {
    propertyName: 'type',
    mapping: {
      array: '#/components/schemas/content-directory',
      file: '#/components/schemas/content-file',
      symlink: '#/components/schemas/content-symlink',
      submodule: '#/components/schemas/content-submodule',
    },
  },
};

function _validateResponse(value: unknown): ReposGetContentResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetContent response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetContentResponse;
}

export const REPOS_GET_CONTENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    path: string,
    params?: ReposGetContentParams | (() => ReposGetContentParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetContentResponse>>
>('REPOS_GET_CONTENT');

export function provideReposGetContent(): FactoryProvider {
  return {
    provide: REPOS_GET_CONTENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        path: string,
        params?:
          ReposGetContentParams | (() => ReposGetContentParams | undefined),
      ) =>
        httpResource<ReposGetContentResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/contents/${path}`,
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
