import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposMergeUpstreamBody = NonNullable<
  paths['/repos/{owner}/{repo}/merge-upstream']['post']['requestBody']
>['content']['application/json'];

export type ReposMergeUpstreamResponse =
  paths['/repos/{owner}/{repo}/merge-upstream']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Merged upstream',
  description: 'Results of a successful merge upstream request',
  type: 'object',
  properties: {
    message: {
      type: 'string',
    },
    merge_type: {
      type: 'string',
      enum: ['merge', 'fast-forward', 'none'],
    },
    base_branch: {
      type: 'string',
    },
  },
};

function _validateResponse(value: unknown): ReposMergeUpstreamResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposMergeUpstream response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposMergeUpstreamResponse;
}

export const REPOS_MERGE_UPSTREAM = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposMergeUpstreamBody | Signal<ReposMergeUpstreamBody>,
  ) => ReturnType<typeof httpResource<ReposMergeUpstreamResponse>>
>('REPOS_MERGE_UPSTREAM');

export function provideReposMergeUpstream(): FactoryProvider {
  return {
    provide: REPOS_MERGE_UPSTREAM,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposMergeUpstreamBody | Signal<ReposMergeUpstreamBody>,
      ) =>
        httpResource<ReposMergeUpstreamResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/merge-upstream`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
