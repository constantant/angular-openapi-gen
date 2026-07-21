import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposReplaceAllTopicsBody = NonNullable<
  paths['/repos/{owner}/{repo}/topics']['put']['requestBody']
>['content']['application/json'];

export type ReposReplaceAllTopicsResponse =
  paths['/repos/{owner}/{repo}/topics']['put']['responses']['200']['content']['application/json'];

export type ReposReplaceAllTopicsError =
  | paths['/repos/{owner}/{repo}/topics']['put']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/topics']['put']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Topic',
  description: 'A topic aggregates entities that are related to a subject.',
  type: 'object',
  properties: {
    names: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['names'],
};

function _validateResponse(value: unknown): ReposReplaceAllTopicsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposReplaceAllTopics response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposReplaceAllTopicsResponse;
}

export const REPOS_REPLACE_ALL_TOPICS = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposReplaceAllTopicsBody | Signal<ReposReplaceAllTopicsBody>,
  ) => ReturnType<typeof httpResource<ReposReplaceAllTopicsResponse>>
>('REPOS_REPLACE_ALL_TOPICS');

export function provideReposReplaceAllTopics(): FactoryProvider {
  return {
    provide: REPOS_REPLACE_ALL_TOPICS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposReplaceAllTopicsBody | Signal<ReposReplaceAllTopicsBody>,
      ) =>
        httpResource<ReposReplaceAllTopicsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/topics`,
            method: 'PUT',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
