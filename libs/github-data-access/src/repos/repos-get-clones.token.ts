import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetClonesParams =
  paths['/repos/{owner}/{repo}/traffic/clones']['get']['parameters']['query'];

export type ReposGetClonesResponse =
  paths['/repos/{owner}/{repo}/traffic/clones']['get']['responses']['200']['content']['application/json'];

export type ReposGetClonesError =
  paths['/repos/{owner}/{repo}/traffic/clones']['get']['responses']['403']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Clone Traffic',
  description: 'Clone Traffic',
  type: 'object',
  properties: {
    count: {
      type: 'integer',
      example: 173,
    },
    uniques: {
      type: 'integer',
      example: 128,
    },
    clones: {
      type: 'array',
      items: {
        title: 'Traffic',
        type: 'object',
        properties: {
          timestamp: {
            type: 'string',
            format: 'date-time',
          },
          uniques: {
            type: 'integer',
          },
          count: {
            type: 'integer',
          },
        },
        required: ['timestamp', 'uniques', 'count'],
      },
    },
  },
  required: ['uniques', 'count', 'clones'],
};

function _validateResponse(value: unknown): ReposGetClonesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetClones response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetClonesResponse;
}

export const REPOS_GET_CLONES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetClonesParams | (() => ReposGetClonesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetClonesResponse>>
>('REPOS_GET_CLONES');

export function provideReposGetClones(): FactoryProvider {
  return {
    provide: REPOS_GET_CLONES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          ReposGetClonesParams | (() => ReposGetClonesParams | undefined),
      ) =>
        httpResource<ReposGetClonesResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/traffic/clones`,
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
