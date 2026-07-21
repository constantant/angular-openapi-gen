import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetRepoRulesetVersionResponse =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history/{version_id}']['get']['responses']['200']['content']['application/json'];

export type ReposGetRepoRulesetVersionError =
  | paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history/{version_id}']['get']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history/{version_id}']['get']['responses']['500']['content']['application/json'];

const _responseSchema: Schema = {
  allOf: [
    {
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
    {
      type: 'object',
      required: ['state'],
      properties: {
        state: {
          type: 'object',
          description: 'The state of the ruleset version',
        },
      },
    },
  ],
};

function _validateResponse(value: unknown): ReposGetRepoRulesetVersionResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetRepoRulesetVersion response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetRepoRulesetVersionResponse;
}

export const REPOS_GET_REPO_RULESET_VERSION = new InjectionToken<
  (
    owner: string,
    repo: string,
    rulesetId: string,
    versionId: string,
  ) => ReturnType<typeof httpResource<ReposGetRepoRulesetVersionResponse>>
>('REPOS_GET_REPO_RULESET_VERSION');

export function provideReposGetRepoRulesetVersion(): FactoryProvider {
  return {
    provide: REPOS_GET_REPO_RULESET_VERSION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        rulesetId: string,
        versionId: string,
      ) =>
        httpResource<ReposGetRepoRulesetVersionResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/rulesets/${rulesetId}/history/${versionId}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
