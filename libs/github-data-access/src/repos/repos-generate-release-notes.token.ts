import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGenerateReleaseNotesBody = NonNullable<
  paths['/repos/{owner}/{repo}/releases/generate-notes']['post']['requestBody']
>['content']['application/json'];

export type ReposGenerateReleaseNotesResponse =
  paths['/repos/{owner}/{repo}/releases/generate-notes']['post']['responses']['200']['content']['application/json'];

export type ReposGenerateReleaseNotesError =
  paths['/repos/{owner}/{repo}/releases/generate-notes']['post']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Generated Release Notes Content',
  description: 'Generated name and body describing a release',
  type: 'object',
  properties: {
    name: {
      description: 'The generated name of the release',
      type: 'string',
      example: 'Release v1.0.0 is now available!',
    },
    body: {
      description:
        'The generated body describing the contents of the release supporting markdown formatting',
      type: 'string',
    },
  },
  required: ['name', 'body'],
};

function _validateResponse(value: unknown): ReposGenerateReleaseNotesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGenerateReleaseNotes response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGenerateReleaseNotesResponse;
}

export const REPOS_GENERATE_RELEASE_NOTES = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposGenerateReleaseNotesBody | Signal<ReposGenerateReleaseNotesBody>,
  ) => ReturnType<typeof httpResource<ReposGenerateReleaseNotesResponse>>
>('REPOS_GENERATE_RELEASE_NOTES');

export function provideReposGenerateReleaseNotes(): FactoryProvider {
  return {
    provide: REPOS_GENERATE_RELEASE_NOTES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          ReposGenerateReleaseNotesBody | Signal<ReposGenerateReleaseNotesBody>,
      ) =>
        httpResource<ReposGenerateReleaseNotesResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/releases/generate-notes`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
