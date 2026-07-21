import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListDeployKeysParams =
  paths['/repos/{owner}/{repo}/keys']['get']['parameters']['query'];

export type ReposListDeployKeysResponse =
  paths['/repos/{owner}/{repo}/keys']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Deploy Key',
    description: 'An SSH key granting access to a single repository.',
    type: 'object',
    properties: {
      id: {
        type: 'integer',
      },
      key: {
        type: 'string',
      },
      url: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      verified: {
        type: 'boolean',
      },
      created_at: {
        type: 'string',
      },
      read_only: {
        type: 'boolean',
      },
      added_by: {
        type: ['string', 'null'],
      },
      last_used: {
        type: ['string', 'null'],
        format: 'date-time',
      },
      enabled: {
        type: 'boolean',
      },
    },
    required: [
      'id',
      'key',
      'url',
      'title',
      'verified',
      'created_at',
      'read_only',
    ],
  },
};

function _validateResponse(value: unknown): ReposListDeployKeysResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListDeployKeys response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListDeployKeysResponse;
}

export const REPOS_LIST_DEPLOY_KEYS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      ReposListDeployKeysParams | (() => ReposListDeployKeysParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListDeployKeysResponse>>
>('REPOS_LIST_DEPLOY_KEYS');

export function provideReposListDeployKeys(): FactoryProvider {
  return {
    provide: REPOS_LIST_DEPLOY_KEYS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListDeployKeysParams
          | (() => ReposListDeployKeysParams | undefined),
      ) =>
        httpResource<ReposListDeployKeysResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/keys`,
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
