import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetReadmeParams =
  paths['/repos/{owner}/{repo}/readme']['get']['parameters']['query'];

export type ReposGetReadmeResponse =
  paths['/repos/{owner}/{repo}/readme']['get']['responses']['200']['content']['application/json'];

export type ReposGetReadmeError =
  | paths['/repos/{owner}/{repo}/readme']['get']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/readme']['get']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
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
};

function _validateResponse(value: unknown): ReposGetReadmeResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetReadme response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetReadmeResponse;
}

export const REPOS_GET_README = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetReadmeParams | (() => ReposGetReadmeParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetReadmeResponse>>
>('REPOS_GET_README');

export function provideReposGetReadme(): FactoryProvider {
  return {
    provide: REPOS_GET_README,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          ReposGetReadmeParams | (() => ReposGetReadmeParams | undefined),
      ) =>
        httpResource<ReposGetReadmeResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/readme`,
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
