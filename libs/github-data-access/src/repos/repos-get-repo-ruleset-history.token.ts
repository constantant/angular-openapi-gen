import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetRepoRulesetHistoryParams =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history']['get']['parameters']['query'];

export type ReposGetRepoRulesetHistoryResponse =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history']['get']['responses']['200']['content']['application/json'];

export type ReposGetRepoRulesetHistoryError =
  | paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history']['get']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history']['get']['responses']['500']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Ruleset version',
    type: 'object',
    description: 'The historical version of a ruleset',
    required: ['version_id', 'actor', 'updated_at'],
    properties: {
      version_id: {
        type: 'integer',
        description: 'The ID of the previous version of the ruleset',
      },
      actor: {
        type: 'object',
        description: 'The actor who updated the ruleset',
        properties: {
          id: {
            type: 'integer',
          },
          type: {
            type: 'string',
          },
        },
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
};

function _validateResponse(value: unknown): ReposGetRepoRulesetHistoryResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetRepoRulesetHistory response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetRepoRulesetHistoryResponse;
}

export const REPOS_GET_REPO_RULESET_HISTORY = new InjectionToken<
  (
    owner: string,
    repo: string,
    rulesetId: string,
    params?:
      | ReposGetRepoRulesetHistoryParams
      | (() => ReposGetRepoRulesetHistoryParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetRepoRulesetHistoryResponse>>
>('REPOS_GET_REPO_RULESET_HISTORY');

export function provideReposGetRepoRulesetHistory(): FactoryProvider {
  return {
    provide: REPOS_GET_REPO_RULESET_HISTORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        rulesetId: string,
        params?:
          | ReposGetRepoRulesetHistoryParams
          | (() => ReposGetRepoRulesetHistoryParams | undefined),
      ) =>
        httpResource<ReposGetRepoRulesetHistoryResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/rulesets/${rulesetId}/history`,
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
