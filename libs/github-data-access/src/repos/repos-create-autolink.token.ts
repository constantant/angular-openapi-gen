import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateAutolinkBody = NonNullable<
  paths['/repos/{owner}/{repo}/autolinks']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateAutolinkResponse =
  paths['/repos/{owner}/{repo}/autolinks']['post']['responses']['201']['content']['application/json'];

export type ReposCreateAutolinkError =
  paths['/repos/{owner}/{repo}/autolinks']['post']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Autolink reference',
  description: 'An autolink reference.',
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3,
    },
    key_prefix: {
      description: 'The prefix of a key that is linkified.',
      example: 'TICKET-',
      type: 'string',
    },
    url_template: {
      description:
        'A template for the target URL that is generated if a key was found.',
      example: 'https://example.com/TICKET?query=<num>',
      type: 'string',
    },
    is_alphanumeric: {
      description:
        'Whether this autolink reference matches alphanumeric characters. If false, this autolink reference only matches numeric characters.',
      example: true,
      type: 'boolean',
    },
    updated_at: {
      type: ['string', 'null'],
      format: 'date-time',
    },
  },
  required: ['id', 'key_prefix', 'url_template', 'is_alphanumeric'],
};

function _validateResponse(value: unknown): ReposCreateAutolinkResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCreateAutolink response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCreateAutolinkResponse;
}

export const REPOS_CREATE_AUTOLINK = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateAutolinkBody | Signal<ReposCreateAutolinkBody>,
  ) => ReturnType<typeof httpResource<ReposCreateAutolinkResponse>>
>('REPOS_CREATE_AUTOLINK');

export function provideReposCreateAutolink(): FactoryProvider {
  return {
    provide: REPOS_CREATE_AUTOLINK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: ReposCreateAutolinkBody | Signal<ReposCreateAutolinkBody>,
      ) =>
        httpResource<ReposCreateAutolinkResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/autolinks`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
