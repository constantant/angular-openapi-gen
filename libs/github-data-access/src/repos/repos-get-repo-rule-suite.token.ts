import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetRepoRuleSuiteResponse =
  paths['/repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}']['get']['responses']['200']['content']['application/json'];

export type ReposGetRepoRuleSuiteError =
  | paths['/repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}']['get']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}']['get']['responses']['500']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Rule Suite',
  description: 'Response',
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'The unique identifier of the rule insight.',
    },
    actor_id: {
      type: ['integer', 'null'],
      description: 'The number that identifies the user.',
    },
    actor_name: {
      type: ['string', 'null'],
      description: 'The handle for the GitHub user account.',
    },
    before_sha: {
      type: 'string',
      description: 'The previous commit SHA of the ref.',
    },
    after_sha: {
      type: 'string',
      description: 'The new commit SHA of the ref.',
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
      type: ['string', 'null'],
      enum: ['pass', 'fail', 'bypass'],
      description:
        'The result of the rule evaluations for rules with the `active` and `evaluate` enforcement statuses, demonstrating whether rules would pass or fail if all rules in the rule suite were `active`. Null if no rules with `evaluate` enforcement status were run.',
    },
    rule_evaluations: {
      type: 'array',
      description: 'Details on the evaluated rules.',
      items: {
        type: 'object',
        properties: {
          rule_source: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'The type of rule source.',
              },
              id: {
                type: ['integer', 'null'],
                description: 'The ID of the rule source.',
              },
              name: {
                type: ['string', 'null'],
                description: 'The name of the rule source.',
              },
            },
          },
          enforcement: {
            type: 'string',
            enum: ['active', 'evaluate', 'deleted ruleset'],
            description: 'The enforcement level of this rule source.',
          },
          result: {
            type: 'string',
            enum: ['pass', 'fail'],
            description: 'The result of the evaluation of the individual rule.',
          },
          rule_type: {
            type: 'string',
            description: 'The type of rule.',
          },
          details: {
            type: ['string', 'null'],
            description:
              'The detailed failure message for the rule. Null if the rule passed.',
          },
        },
      },
    },
  },
};

function _validateResponse(value: unknown): ReposGetRepoRuleSuiteResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetRepoRuleSuite response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetRepoRuleSuiteResponse;
}

export const REPOS_GET_REPO_RULE_SUITE = new InjectionToken<
  (
    owner: string,
    repo: string,
    ruleSuiteId: string,
  ) => ReturnType<typeof httpResource<ReposGetRepoRuleSuiteResponse>>
>('REPOS_GET_REPO_RULE_SUITE');

export function provideReposGetRepoRuleSuite(): FactoryProvider {
  return {
    provide: REPOS_GET_REPO_RULE_SUITE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, ruleSuiteId: string) =>
        httpResource<ReposGetRepoRuleSuiteResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/rulesets/rule-suites/${ruleSuiteId}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
