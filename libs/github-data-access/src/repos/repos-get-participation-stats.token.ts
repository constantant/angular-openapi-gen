import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetParticipationStatsResponse =
  paths['/repos/{owner}/{repo}/stats/participation']['get']['responses']['200']['content']['application/json'];

export type ReposGetParticipationStatsError =
  paths['/repos/{owner}/{repo}/stats/participation']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Participation Stats',
  type: 'object',
  properties: {
    all: {
      type: 'array',
      items: {
        type: 'integer',
      },
    },
    owner: {
      type: 'array',
      items: {
        type: 'integer',
      },
    },
  },
  required: ['all', 'owner'],
};

function _validateResponse(value: unknown): ReposGetParticipationStatsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetParticipationStats response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetParticipationStatsResponse;
}

export const REPOS_GET_PARTICIPATION_STATS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetParticipationStatsResponse>>
>('REPOS_GET_PARTICIPATION_STATS');

export function provideReposGetParticipationStats(): FactoryProvider {
  return {
    provide: REPOS_GET_PARTICIPATION_STATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetParticipationStatsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/stats/participation`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
