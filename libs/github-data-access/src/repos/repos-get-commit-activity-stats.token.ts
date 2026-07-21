import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCommitActivityStatsResponse =
  | paths['/repos/{owner}/{repo}/stats/commit_activity']['get']['responses']['200']['content']['application/json']
  | paths['/repos/{owner}/{repo}/stats/commit_activity']['get']['responses']['202']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Commit Activity',
    description: 'Commit Activity',
    type: 'object',
    properties: {
      days: {
        type: 'array',
        example: [0, 3, 26, 20, 39, 1, 0],
        items: {
          type: 'integer',
        },
      },
      total: {
        type: 'integer',
        example: 89,
      },
      week: {
        type: 'integer',
        example: 1336280400,
      },
    },
    required: ['days', 'total', 'week'],
  },
};

function _validateResponse(
  value: unknown,
): ReposGetCommitActivityStatsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetCommitActivityStats response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetCommitActivityStatsResponse;
}

export const REPOS_GET_COMMIT_ACTIVITY_STATS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetCommitActivityStatsResponse>>
>('REPOS_GET_COMMIT_ACTIVITY_STATS');

export function provideReposGetCommitActivityStats(): FactoryProvider {
  return {
    provide: REPOS_GET_COMMIT_ACTIVITY_STATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetCommitActivityStatsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/stats/commit_activity`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
