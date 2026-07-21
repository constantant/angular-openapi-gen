import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetHashAlgorithmResponse =
  paths['/repos/{owner}/{repo}/hash-algorithm']['get']['responses']['200']['content']['application/json'];

export type ReposGetHashAlgorithmError =
  | paths['/repos/{owner}/{repo}/hash-algorithm']['get']['responses']['403']['content']['application/json']
  | paths['/repos/{owner}/{repo}/hash-algorithm']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Repository hash algorithm',
  description: 'Repository hash algorithm',
  type: 'object',
  properties: {
    hash_algorithm: {
      type: 'string',
      description: 'The Git hash algorithm used by this repository.',
      enum: ['sha1', 'sha256'],
      example: 'sha1',
    },
  },
  required: ['hash_algorithm'],
};

function _validateResponse(value: unknown): ReposGetHashAlgorithmResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetHashAlgorithm response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetHashAlgorithmResponse;
}

export const REPOS_GET_HASH_ALGORITHM = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetHashAlgorithmResponse>>
>('REPOS_GET_HASH_ALGORITHM');

export function provideReposGetHashAlgorithm(): FactoryProvider {
  return {
    provide: REPOS_GET_HASH_ALGORITHM,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetHashAlgorithmResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/hash-algorithm`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
