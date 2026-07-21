import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateDeployKeyBody = NonNullable<
  paths['/repos/{owner}/{repo}/keys']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateDeployKeyResponse =
  paths['/repos/{owner}/{repo}/keys']['post']['responses']['201']['content']['application/json'];

export type ReposCreateDeployKeyError =
  paths['/repos/{owner}/{repo}/keys']['post']['responses']['422']['content']['application/json'];

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

function _validateResponse(value: unknown): ReposCreateDeployKeyResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCreateDeployKey response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCreateDeployKeyResponse;
}

export const REPOS_CREATE_DEPLOY_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateDeployKeyBody | Signal<ReposCreateDeployKeyBody>,
  ) => ReturnType<typeof httpResource<ReposCreateDeployKeyResponse>>
>('REPOS_CREATE_DEPLOY_KEY');

export function provideReposCreateDeployKey(): FactoryProvider {
  return {
    provide: REPOS_CREATE_DEPLOY_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposCreateDeployKeyBody | Signal<ReposCreateDeployKeyBody>,
      ) =>
        httpResource<ReposCreateDeployKeyResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/keys`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
