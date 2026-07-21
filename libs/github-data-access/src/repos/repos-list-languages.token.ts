import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListLanguagesResponse =
  paths['/repos/{owner}/{repo}/languages']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Language',
  description: 'Language',
  type: 'object',
  additionalProperties: {
    type: 'integer',
  },
};

function _validateResponse(value: unknown): ReposListLanguagesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposListLanguages response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposListLanguagesResponse;
}

export const REPOS_LIST_LANGUAGES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposListLanguagesResponse>>
>('REPOS_LIST_LANGUAGES');

export function provideReposListLanguages(): FactoryProvider {
  return {
    provide: REPOS_LIST_LANGUAGES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposListLanguagesResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/languages`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
