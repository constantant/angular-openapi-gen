import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetRepoRuleSuitesParams =
  paths['/repos/{owner}/{repo}/rulesets/rule-suites']['get']['parameters']['query'];

export type ReposGetRepoRuleSuitesResponse =
  paths['/repos/{owner}/{repo}/rulesets/rule-suites']['get']['responses']['200']['content']['application/json'];

export type ReposGetRepoRuleSuitesError =
  | paths['/repos/{owner}/{repo}/rulesets/rule-suites']['get']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/rulesets/rule-suites']['get']['responses']['500']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Rule Suites',
  description: 'Response',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The unique identifier of the rule insight.',
      },
      actor_id: {
        type: 'integer',
        description: 'The number that identifies the user.',
      },
      actor_name: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      before_sha: {
        type: 'string',
        description: 'The first commit sha before the push evaluation.',
      },
      after_sha: {
        type: 'string',
        description: 'The last commit sha in the push evaluation.',
      },
      ref: {
        type: 'string',
        description: 'The ref name that the evaluation ran on.',
      },
      repository_id: {
        type: 'integer',
        description:
          'The ID of the repository associated with the rule evaluation.',
      },
      repository_name: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension.',
      },
      pushed_at: {
        type: 'string',
        format: 'date-time',
        example: '2011-01-26T19:06:43Z',
      },
      result: {
        type: 'string',
        enum: ['pass', 'fail', 'bypass'],
        description:
          'The result of the rule evaluations for rules with the `active` enforcement status.',
      },
      evaluation_result: {
        type: 'string',
        enum: ['pass', 'fail', 'bypass'],
        description:
          'The result of the rule evaluations for rules with the `active` and `evaluate` enforcement statuses, demonstrating whether rules would pass or fail if all rules in the rule suite were `active`.',
      },
    },
  },
};

function _validateResponse(value: unknown): ReposGetRepoRuleSuitesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetRepoRuleSuites response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetRepoRuleSuitesResponse;
}

export const REPOS_GET_REPO_RULE_SUITES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposGetRepoRuleSuitesParams
      | (() => ReposGetRepoRuleSuitesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetRepoRuleSuitesResponse>>
>('REPOS_GET_REPO_RULE_SUITES');

export function provideReposGetRepoRuleSuites(): FactoryProvider {
  return {
    provide: REPOS_GET_REPO_RULE_SUITES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposGetRepoRuleSuitesParams
          | (() => ReposGetRepoRuleSuitesParams | undefined),
      ) =>
        httpResource<ReposGetRepoRuleSuitesResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/rulesets/rule-suites`,
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
