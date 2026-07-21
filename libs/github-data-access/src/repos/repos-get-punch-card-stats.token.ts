import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetPunchCardStatsResponse =
  paths['/repos/{owner}/{repo}/stats/punch_card']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Code Frequency Stat',
    description: 'Code Frequency Stat',
    type: 'array',
    items: {
      type: 'integer',
    },
  },
};

function _validateResponse(value: unknown): ReposGetPunchCardStatsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetPunchCardStats response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetPunchCardStatsResponse;
}

export const REPOS_GET_PUNCH_CARD_STATS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetPunchCardStatsResponse>>
>('REPOS_GET_PUNCH_CARD_STATS');

export function provideReposGetPunchCardStats(): FactoryProvider {
  return {
    provide: REPOS_GET_PUNCH_CARD_STATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetPunchCardStatsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/stats/punch_card`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
