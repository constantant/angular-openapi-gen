import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListTagsParams =
  paths['/repos/{owner}/{repo}/tags']['get']['parameters']['query'];

export type ReposListTagsResponse =
  paths['/repos/{owner}/{repo}/tags']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Tag',
    description: 'Tag',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'v0.1',
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
      zipball_url: {
        type: 'string',
        format: 'uri',
        example: 'https://github.com/octocat/Hello-World/zipball/v0.1',
      },
      tarball_url: {
        type: 'string',
        format: 'uri',
        example: 'https://github.com/octocat/Hello-World/tarball/v0.1',
      },
      node_id: {
        type: 'string',
      },
    },
    required: ['name', 'node_id', 'commit', 'zipball_url', 'tarball_url'],
  },
};

function _validateResponse(value: unknown): ReposListTagsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListTags response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListTagsResponse;
}

export const REPOS_LIST_TAGS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListTagsParams | (() => ReposListTagsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListTagsResponse>>
>('REPOS_LIST_TAGS');

export function provideReposListTags(): FactoryProvider {
  return {
    provide: REPOS_LIST_TAGS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?: ReposListTagsParams | (() => ReposListTagsParams | undefined),
      ) =>
        httpResource<ReposListTagsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/tags`,
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
