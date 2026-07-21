import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetDeployKeyResponse =
  paths['/repos/{owner}/{repo}/keys/{key_id}']['get']['responses']['200']['content']['application/json'];

export type ReposGetDeployKeyError =
  paths['/repos/{owner}/{repo}/keys/{key_id}']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
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
};

function _validateResponse(value: unknown): ReposGetDeployKeyResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetDeployKey response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetDeployKeyResponse;
}

export const REPOS_GET_DEPLOY_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
    keyId: string,
  ) => ReturnType<typeof httpResource<ReposGetDeployKeyResponse>>
>('REPOS_GET_DEPLOY_KEY');

export function provideReposGetDeployKey(): FactoryProvider {
  return {
    provide: REPOS_GET_DEPLOY_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, keyId: string) =>
        httpResource<ReposGetDeployKeyResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/keys/${keyId}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
