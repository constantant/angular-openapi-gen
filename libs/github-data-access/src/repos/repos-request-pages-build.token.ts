import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRequestPagesBuildResponse =
  paths['/repos/{owner}/{repo}/pages/builds']['post']['responses']['201']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Page Build Status',
  description: 'Page Build Status',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
      example:
        'https://api.github.com/repos/github/hello-world/pages/builds/latest',
    },
    status: {
      type: 'string',
      example: 'queued',
    },
  },
  required: ['url', 'status'],
};

function _validateResponse(value: unknown): ReposRequestPagesBuildResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposRequestPagesBuild response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposRequestPagesBuildResponse;
}

export const REPOS_REQUEST_PAGES_BUILD = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposRequestPagesBuildResponse>>
>('REPOS_REQUEST_PAGES_BUILD');

export function provideReposRequestPagesBuild(): FactoryProvider {
  return {
    provide: REPOS_REQUEST_PAGES_BUILD,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposRequestPagesBuildResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/pages/builds`,
            method: 'POST',
          }),
          { parse: _validateResponse },
        );
    },
  };
}
