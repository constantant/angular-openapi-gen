import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListBranchesForHeadCommitResponse =
  paths['/repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head']['get']['responses']['200']['content']['application/json'];

export type ReposListBranchesForHeadCommitError =
  | paths['/repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head']['get']['responses']['409']['content']['application/json']
  | paths['/repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head']['get']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Branch Short',
    description: 'Branch Short',
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      commit: {
        type: 'object',
        properties: {
          sha: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
        },
        required: ['sha', 'url'],
      },
      protected: {
        type: 'boolean',
      },
    },
    required: ['name', 'commit', 'protected'],
  },
};

function _validateResponse(
  value: unknown,
): ReposListBranchesForHeadCommitResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListBranchesForHeadCommit response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListBranchesForHeadCommitResponse;
}

export const REPOS_LIST_BRANCHES_FOR_HEAD_COMMIT = new InjectionToken<
  (
    owner: string,
    repo: string,
    commitSha: string,
  ) => ReturnType<typeof httpResource<ReposListBranchesForHeadCommitResponse>>
>('REPOS_LIST_BRANCHES_FOR_HEAD_COMMIT');

export function provideReposListBranchesForHeadCommit(): FactoryProvider {
  return {
    provide: REPOS_LIST_BRANCHES_FOR_HEAD_COMMIT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, commitSha: string) =>
        httpResource<ReposListBranchesForHeadCommitResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/commits/${commitSha}/branches-where-head`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
