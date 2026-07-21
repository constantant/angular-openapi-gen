import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetTopReferrersResponse =
  paths['/repos/{owner}/{repo}/traffic/popular/referrers']['get']['responses']['200']['content']['application/json'];

export type ReposGetTopReferrersError =
  paths['/repos/{owner}/{repo}/traffic/popular/referrers']['get']['responses']['403']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Referrer Traffic',
    description: 'Referrer Traffic',
    type: 'object',
    properties: {
      referrer: {
        type: 'string',
        example: 'Google',
      },
      count: {
        type: 'integer',
        example: 4,
      },
      uniques: {
        type: 'integer',
        example: 3,
      },
    },
    required: ['referrer', 'uniques', 'count'],
  },
};

function _validateResponse(value: unknown): ReposGetTopReferrersResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetTopReferrers response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetTopReferrersResponse;
}

export const REPOS_GET_TOP_REFERRERS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetTopReferrersResponse>>
>('REPOS_GET_TOP_REFERRERS');

export function provideReposGetTopReferrers(): FactoryProvider {
  return {
    provide: REPOS_GET_TOP_REFERRERS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetTopReferrersResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/traffic/popular/referrers`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
