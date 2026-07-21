import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetTopPathsResponse =
  paths['/repos/{owner}/{repo}/traffic/popular/paths']['get']['responses']['200']['content']['application/json'];

export type ReposGetTopPathsError =
  paths['/repos/{owner}/{repo}/traffic/popular/paths']['get']['responses']['403']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Content Traffic',
    description: 'Content Traffic',
    type: 'object',
    properties: {
      path: {
        type: 'string',
        example: '/github/hubot',
      },
      title: {
        type: 'string',
        example: 'github/hubot: A customizable life embetterment robot.',
      },
      count: {
        type: 'integer',
        example: 3542,
      },
      uniques: {
        type: 'integer',
        example: 2225,
      },
    },
    required: ['path', 'title', 'uniques', 'count'],
  },
};

function _validateResponse(value: unknown): ReposGetTopPathsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetTopPaths response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetTopPathsResponse;
}

export const REPOS_GET_TOP_PATHS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetTopPathsResponse>>
>('REPOS_GET_TOP_PATHS');

export function provideReposGetTopPaths(): FactoryProvider {
  return {
    provide: REPOS_GET_TOP_PATHS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetTopPathsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/traffic/popular/paths`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
