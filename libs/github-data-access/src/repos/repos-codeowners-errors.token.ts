import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCodeownersErrorsParams =
  paths['/repos/{owner}/{repo}/codeowners/errors']['get']['parameters']['query'];

export type ReposCodeownersErrorsResponse =
  paths['/repos/{owner}/{repo}/codeowners/errors']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'CODEOWNERS errors',
  description: "A list of errors found in a repo's CODEOWNERS file",
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          line: {
            description: 'The line number where this errors occurs.',
            type: 'integer',
            example: 7,
          },
          column: {
            description: 'The column number where this errors occurs.',
            type: 'integer',
            example: 3,
          },
          source: {
            description: 'The contents of the line where the error occurs.',
            type: 'string',
            example: '* user',
          },
          kind: {
            description: 'The type of error.',
            type: 'string',
            example: 'Invalid owner',
          },
          suggestion: {
            description:
              'Suggested action to fix the error. This will usually be `null`, but is provided for some common errors.',
            type: ['string', 'null'],
            example:
              'The pattern `/` will never match anything, did you mean `*` instead?',
          },
          message: {
            description:
              'A human-readable description of the error, combining information from multiple fields, laid out for display in a monospaced typeface (for example, a command-line setting).',
            type: 'string',
            example: 'Invalid owner on line 7:\n\n  * user\n    ^',
          },
          path: {
            description: 'The path of the file where the error occured.',
            type: 'string',
            example: '.github/CODEOWNERS',
          },
        },
        required: ['line', 'column', 'kind', 'message', 'path'],
      },
    },
  },
  required: ['errors'],
};

function _validateResponse(value: unknown): ReposCodeownersErrorsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCodeownersErrors response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCodeownersErrorsResponse;
}

export const REPOS_CODEOWNERS_ERRORS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposCodeownersErrorsParams
      | (() => ReposCodeownersErrorsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposCodeownersErrorsResponse>>
>('REPOS_CODEOWNERS_ERRORS');

export function provideReposCodeownersErrors(): FactoryProvider {
  return {
    provide: REPOS_CODEOWNERS_ERRORS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposCodeownersErrorsParams
          | (() => ReposCodeownersErrorsParams | undefined),
      ) =>
        httpResource<ReposCodeownersErrorsResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/codeowners/errors`,
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
